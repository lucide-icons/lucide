import 'dotenv/config'
import OpenAI from "openai";
import { Octokit } from "@octokit/rest";
import { zodTextFormat } from "openai/helpers/zod";

import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import z from "zod";

// Resolve repo paths relative to this script so they work no matter which
// directory the script is invoked from (the workflow runs it from the repo root).
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(scriptDir, "..");
const iconsDir = path.join(repoRoot, "icons");
const categoriesDir = path.join(repoRoot, "categories");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const pullRequestNumber = Number(process.env.PULL_REQUEST_NUMBER);
const username = process.env.REVIEWER ?? 'github-actions[bot]';
const commitSha = process.env.COMMIT_SHA ?? "HEAD";
const useFileSystem = process.env.USE_FILE_SYSYEM === 'true' || false;

const owner = 'lucide-icons';
const repo = 'lucide';

const METADATA_FIELDS = ['tags', 'categories', 'use-cases'] as const;
type MetadataField = (typeof METADATA_FIELDS)[number];

// Load the allowed categories (name + human-readable title) straight from the
// `categories/` directory so we can both validate suggestions and give the
// model a description of every category.
async function loadCategories() {
  const files = (await fs.readdir(categoriesDir)).filter((file) => file.endsWith('.json'));

  const categories = await Promise.all(
    files.map(async (file) => {
      const { title } = JSON.parse(await fs.readFile(path.join(categoriesDir, file), 'utf-8'));
      return { name: path.basename(file, '.json'), title };
    }),
  );

  return categories.sort((a, b) => a.name.localeCompare(b.name));
}

// Sample a handful of well-populated icons to feed the model as few-shot
// examples so its suggestions match the repository's house style. Candidates
// are spread evenly across the (alphabetically sorted) icon set and read
// sequentially to keep the number of open file handles bounded.
async function loadReferenceExamples(count = 8) {
  const fileNames = (await fs.readdir(iconsDir)).filter((file) => file.endsWith('.json')).sort();
  const candidateCount = Math.min(fileNames.length, count * 8);
  const step = Math.max(1, Math.floor(fileNames.length / candidateCount));

  const examples: Record<string, unknown>[] = [];
  for (let i = 0; i < fileNames.length && examples.length < count; i += step) {
    try {
      const metadata = JSON.parse(await fs.readFile(path.join(iconsDir, fileNames[i]), 'utf-8'));
      const isWellPopulated = METADATA_FIELDS.every(
        (field) => Array.isArray(metadata[field]) && metadata[field].length > 0,
      );

      if (isWellPopulated) {
        examples.push({
          name: path.basename(fileNames[i], '.json'),
          tags: metadata.tags,
          categories: metadata.categories,
          'use-cases': metadata['use-cases'],
        });
      }
    } catch {
      // Ignore files that fail to parse.
    }
  }

  return examples;
}

const categories = await loadCategories();
const categoryNames = categories.map((category) => category.name);
const referenceExamples = await loadReferenceExamples();

const metadataSchema = z.object({
  tags: z.array(z.string()),
  categories: z.array(z.enum(categoryNames as [string, ...string[]])),
  "use-cases": z.array(z.string()),
})

type MetadataSuggestion = z.infer<typeof metadataSchema>;

const { data: files } = await octokit.pulls.listFiles({
  owner,
  repo,
  pull_number: pullRequestNumber,
});

const { data: reviews } = await octokit.pulls.listReviews({
  owner,
  repo,
  pull_number: pullRequestNumber,
  query: `in:body author:github-actions[bot]`,
});

// Get the PR description so the model can ground its suggestions in the
// author's stated intent for the icon. Truncated to keep the prompt small.
const { data: pullRequest } = await octokit.pulls.get({
  owner,
  repo,
  pull_number: pullRequestNumber,
});

const prDescription = (pullRequest.body || '').slice(0, 4000);

const hasUserReviews = reviews.some(review => review.user?.login === username);

// TODO: Find a better way to check if the PR has been updated since the last review
if(hasUserReviews) {
  console.log(`Pull request #${pullRequestNumber} already has reviews from ${username}. Skipping...`);
  process.exit(0);
}

const changedFiles = files.filter(
  ({filename}) => filename.startsWith('icons/') && filename.includes('.json')
)

if (changedFiles.length === 0) {
  console.log('No changed icons found');
  process.exit(0);
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const categoriesContext = categories.map(({ name, title }) => `- ${name}: ${title}`).join('\n');

// Render an array property exactly as it should appear in the metadata JSON,
// preserving the repo's 2-space indentation and the original trailing comma.
function buildArrayBlock(field: MetadataField, values: string[], trailingComma: string) {
  const indent = '  ';
  const itemIndent = '    ';

  if (values.length === 0) {
    return `${indent}"${field}": []${trailingComma}`;
  }

  const items = values.map((value) => `${itemIndent}${JSON.stringify(value)}`).join(',\n');
  return `${indent}"${field}": [\n${items}\n${indent}]${trailingComma}`;
}

// Locate the line range of an array property in the raw file so we can anchor a
// GitHub suggestion to it. Handles both inline (`"use-cases": []`) and
// multi-line arrays, and reports whether the closing line has a trailing comma.
function findFieldBlock(lines: string[], field: MetadataField) {
  const startIdx = lines.findIndex((line) => line.trimStart().startsWith(`"${field}":`));
  if (startIdx === -1) return null;

  let endIdx = startIdx;
  if (!lines[startIdx].includes(']')) {
    for (let i = startIdx + 1; i < lines.length; i++) {
      endIdx = i;
      if (lines[i].trimStart().startsWith(']')) break;
    }
  }

  const trailingComma = lines[endIdx].trim().endsWith(',') ? ',' : '';
  return { startLine: startIdx + 1, endLine: endIdx + 1, trailingComma };
}

const suggestionsByFile = changedFiles.map(async ({ filename, raw_url }) => {
  const iconName = path.basename(filename, '.json');

  // Read the icon's current metadata (the PR head version) first, so we can
  // both give it to the model as context and dedupe suggestions against it.
  let fileContent: string
  if (useFileSystem) {
    fileContent = await fs.readFile(path.join(repoRoot, filename), 'utf-8');
  } else {
    const fileGithubRequest = await octokit.request(`GET ${raw_url}`, {
      headers: {
        'Accept': 'application/vnd.github.v3.raw',
      },
    });
    fileContent = fileGithubRequest.data
  }

  const metadata = JSON.parse(fileContent)

  const currentMetadata = {
    tags: metadata.tags ?? [],
    categories: metadata.categories ?? [],
    "use-cases": metadata["use-cases"] ?? [],
  };

  const input = `You are maintaining the metadata for the Lucide icon library. Suggest additional metadata for the \`${iconName}\` icon.

Guidelines:
- tags: lowercase, single words, no spaces. Used for search. Never include the word "icon" or the icon's own name ("${iconName}").
- categories: only use values from the allowed categories listed below. Lowercase. Keep them relevant to the icon.
- use-cases: short lowercase phrases describing concrete situations the icon represents (e.g. "indicating a disabled webcam"). No trailing punctuation.
Only suggest NEW values that build on the current metadata, and prefer quality over quantity.

Allowed categories:
${categoriesContext}

Current metadata for "${iconName}":
${JSON.stringify(currentMetadata, null, 2)}

Pull request description:
${prDescription || '(no description provided)'}

Reference examples from existing icons:
${JSON.stringify(referenceExamples, null, 2)}`;

  const response = await client.responses.create({
      model: "gpt-5-mini",
      input,
      text: {
        format: zodTextFormat(metadataSchema, "metadata"),
      },
  });

  const suggested: MetadataSuggestion = JSON.parse(response.output_text);

  console.log(`Suggestions for ${iconName}:`, suggested);
  console.log(`Current metadata for ${iconName}:`, currentMetadata);

  const lines = fileContent.split('\n');
  const chatGptQuery = `Suggest tags, categories and use-cases for a "${iconName}" icon in the Lucide icon library.`;

  // Build one inline GitHub suggestion per field, deduped against the values
  // already present in the file.
  const comments = METADATA_FIELDS.flatMap((field) => {
    const current: string[] = currentMetadata[field];
    const newValues = suggested[field].filter((value) => !current.includes(value) && value !== iconName);

    if (newValues.length === 0) {
      console.log(`No new ${field} to suggest for ${iconName}. Skipping...`);
      return [];
    }

    const block = findFieldBlock(lines, field);
    if (!block) {
      console.log(`Could not locate "${field}" in ${filename}. Skipping...`);
      return [];
    }

    const suggestion = buildArrayBlock(field, [...current, ...newValues], block.trailingComma);

    const body = `Suggested \`${field}\` for the \`${iconName}\` icon.
\`\`\`suggestion
${suggestion}
\`\`\`
Want more ideas? [Ask ChatGPT](https://chatgpt.com/?q=${encodeURIComponent(chatGptQuery)})`;

    const comment: Record<string, unknown> = {
      path: filename,
      line: block.endLine,
      side: "RIGHT",
      body,
    };

    // Multi-line arrays need a start anchor; inline arrays are single-line.
    if (block.endLine !== block.startLine) {
      comment.start_line = block.startLine;
      comment.start_side = "RIGHT";
    }

    return [comment];
  });

  return comments;
})

const comments = (await Promise.all(suggestionsByFile)).flat()

if (comments.length === 0) {
  console.log('No new metadata to suggest for any icons.');
  process.exit(0);
}

const reviewBody = `### 🤖 ChatGPT metadata suggestions ✨
I've asked ChatGPT for some suggestions for \`tags\`, \`categories\` and \`use-cases\`.`;

try {
  console.log({
    owner,
    repo,
    pull_number: pullRequestNumber,
    body: reviewBody,
    event: "COMMENT",
    comments,
    commit_id: commitSha,
  })
  await octokit.pulls.createReview({
    owner,
    repo,
    pull_number: pullRequestNumber,
    body: reviewBody,
    event: "COMMENT",
    comments,
    commit_id: commitSha,
  });
} catch (error) {
  console.error('Error creating review:', error);
  process.exit(0);
}
