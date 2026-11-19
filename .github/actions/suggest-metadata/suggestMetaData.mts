import 'dotenv/config'
import OpenAI from "openai";
import { Octokit } from "@octokit/rest";
import path from "node:path";
import { parseArgs } from "node:util";
import { toMetadata, type IconJson, type Metadata } from './src/metadata.mts';
import {
  loadCategories,
  loadGroups,
  loadIcons,
  loadMetadataInstructions,
} from './src/repository.mts';
import {
  createFileReader,
  formatSuggestionsCache,
  loadPreviousSuggestions,
  loadSuggestionsCache,
} from './src/pullRequest.mts';
import { createIconIndex } from './src/iconIndex.mts';
import { createReferenceExamples, getTerms } from './src/referenceExamples.mts';
import { createSuggestionRequester, type MetadataSuggestion } from './src/model.mts';
import { buildComments } from './src/suggestionComments.mts';

const {
  values: { debug },
} = parseArgs({
  options: {
    debug: {
      type: 'boolean',
      default: false,
    },
  },
});

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const username = process.env.REVIEWER ?? 'github-actions[bot]';
const useFileSystem = process.env.USE_FILE_SYSTEM === 'true' || false;

const pullRequestParams = {
  owner: 'lucide-icons',
  repo: 'lucide',
  pull_number: Number(process.env.PULL_REQUEST_NUMBER),
};

const [categories, groups, checkoutIcons, metadataInstructions] = await Promise.all([
  loadCategories(),
  loadGroups(),
  loadIcons(),
  loadMetadataInstructions(),
]);

const suggestionsCache = await loadSuggestionsCache(octokit, pullRequestParams, username);

const { data: files } = await octokit.pulls.listFiles(pullRequestParams);

// Get the PR description so the model can ground its suggestions in the
// author's stated intent for the icon. Truncated to keep the prompt small.
const { data: pullRequest } = await octokit.pulls.get(pullRequestParams);

const prDescription = (pullRequest.body || '').slice(0, 4000);

// The commit the review comments are anchored to. Icon files are read at this
// commit too, so line numbers match even if new commits are pushed mid-run.
const commitSha = process.env.COMMIT_SHA || pullRequest.head.sha;

const { previouslySuggestedValues, openSuggestions } = await loadPreviousSuggestions(
  octokit,
  pullRequestParams,
  username,
);

const changedFiles = files.filter(
  ({filename}) => filename.startsWith('icons/') && filename.includes('.json')
)
const changedGroupFiles = files.filter(
  ({ filename }) => filename.startsWith('groups/') && filename.endsWith('.json'),
);

if (changedFiles.length === 0) {
  console.log('No changed icons found');
  process.exit(0);
}

const readPullRequestFile = createFileReader({
  octokit,
  pullRequest: pullRequestParams,
  commitSha,
  useFileSystem,
});

// Read the changed icons first, so we can both give their metadata to the
// model as context and dedupe suggestions against it.
const changedIcons = (
  await Promise.all(
    changedFiles.map(async ({ filename }) => {
      const fileContent = await readPullRequestFile(filename);
      if (fileContent === null) return null;

      const iconName = path.basename(filename, '.json');
      return { filename, iconName, fileContent, metadata: JSON.parse(fileContent) as IconJson };
    }),
  )
).filter((icon) => icon !== null);

// The pull request can add or change groups and base icons too, so its
// versions replace the ones of the checkout before markers are resolved.
for (const { filename } of changedGroupFiles) {
  const fileContent = await readPullRequestFile(filename);
  if (fileContent === null) continue;

  const { description, tags } = JSON.parse(fileContent);
  if (Array.isArray(tags)) groups[path.basename(filename, '.json')] = { description, tags };
}

const icons: Record<string, IconJson> = {
  ...checkoutIcons,
  ...Object.fromEntries(changedIcons.map(({ iconName, metadata }) => [iconName, metadata])),
};

const index = createIconIndex(icons, groups);
const findReferenceExamples = createReferenceExamples({
  checkoutIcons,
  changedIconNames: new Set(changedIcons.map(({ iconName }) => iconName)),
  resolvedIcons: index.resolvedIcons,
});

const requestSuggestion = createSuggestionRequester({
  client: new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }),
  model: process.env.OPENAI_API_MODEL ?? "gpt-5-mini",
  categories,
  groups,
  metadataInstructions,
  prDescription,
});

async function getSuggestion(
  iconName: string,
  currentMetadata: Metadata,
): Promise<MetadataSuggestion> {
  if (suggestionsCache[iconName]) {
    console.log(`Using cached suggestions for ${iconName}.`);
    return suggestionsCache[iconName];
  }

  const referenceExamples = findReferenceExamples(
    getTerms(iconName, currentMetadata, index.resolvedIcons[iconName]),
  );
  console.log(
    `Reference examples for ${iconName}:`,
    referenceExamples.map(({ name }) => name).join(', '),
  );

  const suggested = await requestSuggestion({
    iconName,
    currentMetadata,
    referenceExamples,
    baseIcons: index.getBaseIconsContext(iconName, currentMetadata),
  });
  suggestionsCache[iconName] = suggested;

  return suggested;
}

const suggestionsByFile = await Promise.all(
  changedIcons.map(async ({ filename, iconName, fileContent, metadata }) => {
    const currentMetadata = toMetadata(metadata);
    const suggested = await getSuggestion(iconName, currentMetadata);

    console.log(`Suggestions for ${iconName}:`, suggested);
    console.log(`Current metadata for ${iconName}:`, currentMetadata);

    return { filename, iconName, fileContent, currentMetadata, suggested };
  }),
);

const comments = suggestionsByFile.flatMap((file) =>
  buildComments(file, { index, groups, previouslySuggestedValues, openSuggestions }),
);

if (comments.length === 0) {
  console.log('No new metadata to suggest for any icons.');
  process.exit(0);
}

const reviewBody = `### 🤖 Metadata suggestions ✨
I've asked ChatGPT for some suggestions for \`tags\`, \`categories\` and \`use-cases\`.
Please review them and apply any that you find useful.

${formatSuggestionsCache(suggestionsCache)}
`;

const review = {
  ...pullRequestParams,
  body: reviewBody,
  event: "COMMENT" as const,
  comments,
  commit_id: commitSha,
};

console.log(JSON.stringify(review, null, 2));

if (debug) {
  console.log('Debug mode enabled. Review was not posted to GitHub.');
  process.exit(0);
}

try {
  await octokit.pulls.createReview(review);
} catch (error) {
  console.error('Error creating review:', error);
  process.exit(0);
}
