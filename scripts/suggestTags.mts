import 'dotenv/config'
import OpenAI from "openai";
import { Octokit } from "@octokit/rest";
import { zodTextFormat } from "openai/helpers/zod";

import path from "node:path";
import fs from "node:fs/promises";
import z from "zod";
import { type IconMetadata } from '../tools/build-icons/types.ts';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const pullRequestNumber = Number(process.env.PULL_REQUEST_NUMBER);
const username = process.env.REVIEWER ?? 'github-actions[bot]';
const commitSha = process.env.COMMIT_SHA ?? "HEAD";
const useFileSystem = process.env.USE_FILE_SYSYEM === 'true' || false;

const owner = 'lucide-icons';
const repo = 'lucide';

const tagsSchema = z.object({
  tags: z.array(z.string()),
})

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

const suggestionsByFile = changedFiles.map(async ({ filename, raw_url }) => {
  const filePath = filename.replace('.json', '');
  const iconName = filePath.split('/').pop();

  const input = `Create a list of tags for a \`${iconName}\` icon. Don't include words like: 'icon' and preferably use single words.`;

  const response = await client.responses.create({
      model: "gpt-4.1-nano",
      input,
      text: {
        format: zodTextFormat(tagsSchema, "tags"),
      },
  });

  const { tags: suggestedTags }: IconMetadata = JSON.parse(response.output_text);

  console.log(`Suggesting tags for ${iconName}:`, suggestedTags);

  let fileContent: string

  if( useFileSystem ) {
    const jsonFile = path.join(process.cwd(), filename);
    fileContent = await fs.readFile(jsonFile, 'utf-8') as unknown as string;
  } else {
    const fileGithubRequest = await octokit.request(`GET ${raw_url}`, {
      headers: {
        'Accept': 'application/vnd.github.v3.raw',
      },
    });
    fileContent = fileGithubRequest.data
  }

  const metadata = JSON.parse(fileContent)

  console.log(`Current tags for ${iconName}:`, metadata.tags || []);

  const tagSuggestionsWithoutDuplicates = suggestedTags.filter((tag) => {
    return !metadata.tags?.includes(tag) && tag !== iconName;
  });

  console.log(`Tag suggestions for ${iconName} without duplicates:`, tagSuggestionsWithoutDuplicates);

  if (tagSuggestionsWithoutDuplicates.length === 0) {
    console.log(`No new tags to suggest for ${iconName}. Skipping...`);
    return Promise.resolve(null);
  }
  // Find the startLine in the json file
  const startLine = fileContent.split('\n').findIndex((line) => line.includes('"tags":')) + 1;

  const codeSuggestion = tagSuggestionsWithoutDuplicates.map((tag) => `    "${tag}"`).join(',\n');

  const message = `Suggestions for the \`${iconName}\` icon.
  Try asking it your self if you want more suggestions. [Open ChatGPT](https://chatgpt.com/?q=${encodeURIComponent(input)})
Here are the suggestions:
\`\`\`suggestion\n  "tags": [\n${codeSuggestion},`;

  return {
    path: filename,
    line: startLine,
    body: message,
    side: "RIGHT"
  }
})

const comments = (await Promise.all(suggestionsByFile)).filter(comment => comment !== null)

if (comments.length === 0) {
  console.log('No new tags to suggest for any icons.');
  process.exit(0);
}

try {
  console.log({
    owner,
    repo,
    pull_number: pullRequestNumber,
    body: `### 🤖 ChatGPT Tags suggestions ✨
  I've asked ChatGPT for some suggestions for tags.`,
    event: "COMMENT",
    comments,
    commit_id: commitSha,
  })
  await octokit.pulls.createReview({
    owner,
    repo,
    pull_number: pullRequestNumber,
    body: `### 🤖 ChatGPT Tags suggestions ✨
  I've asked ChatGPT for some suggestions for tags.`,
    event: "COMMENT",
    comments,
    commit_id: commitSha,
  });
} catch (error) {
  console.error('Error creating review:', error);
  process.exit(0);
}
