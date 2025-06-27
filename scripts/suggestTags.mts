import OpenAI from "openai";
import { Octokit } from "@octokit/rest";
import { zodTextFormat } from "openai/helpers/zod";

import path from "node:path";
import fs from "node:fs/promises";
import z from "zod";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const pullRequestNumber = Number(process.env.PULL_REQUEST_NUMBER);
const username = process.env.REVIEWER ?? 'github-actions[bot]';
const commitSha = process.env.COMMIT_SHA ?? "HEAD";

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

// if(hasUserReviews) {
//   console.log(`Pull request #${pullRequestNumber} already has reviews from ${username}. Skipping...`);
//   process.exit(0);
// }

const changedFiles = files
  .map((file) => file.filename)
  .filter((file) => file.startsWith('icons/') && file.includes('.json'))
  .filter((file, idx, arr) => arr.indexOf(file) === idx);;

if (changedFiles.length === 0) {
  console.log('No changed icons found');
  process.exit(0);
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const suggestionsByFile = changedFiles.map(async (file) => {
  const filePath = file.replace('.json', '');
  const iconName = filePath.split('/').pop();

  const input = `Create a list of tags for a \`${iconName}\` icon. Don't include words like: 'icon' and don't include spaces.`

  const response = await client.responses.create({
      model: "gpt-4.1-nano",
      input,
      text: {
        format: zodTextFormat(tagsSchema, "tags"),
      },
  });

  const { tags: suggestedTags } = JSON.parse(response.output_text);

  console.log(`Suggesting tags for ${iconName}:`, suggestedTags);

  // const currentContent = require(`../${filePath}`);
  const jsonFile = path.join(process.cwd(), file);
  const currentFileContent = await fs.readFile(jsonFile, 'utf-8') as unknown as string;
  const metaData = JSON.parse(currentFileContent);

  console.log(`Current tags for ${iconName}:`, metaData.tags || []);

  const tagSuggestionsWithoutDuplicates = suggestedTags.filter((tag) => {
    return !metaData.tags?.includes(tag) && tag !== iconName;
  });

  console.log(`Tag suggestions for ${iconName} without duplicates:`, tagSuggestionsWithoutDuplicates);

  // Find the startLine in the json file
  const startLine = currentFileContent.split('\n').findIndex((line) => line.includes('"tags":')) + 1;

  const codeSuggestion = tagSuggestionsWithoutDuplicates.map((tag) => `    "${tag}"`).join(',\n');

  const message = `Suggestions for the \`${iconName}\` icon.
  Try asking it your self if you want more suggestions. [Open ChatGPT](https://chatgpt.com/?q=${encodeURIComponent(input)})
Here are the suggestions:
\`\`\`suggestion\n  "tags": [\n${codeSuggestion}`;

  return {
    path: file,
    line: startLine,
    body: message,
  }
})

const comments = await Promise.all(suggestionsByFile)

await octokit.pulls.createReview({
  owner,
  repo,
  pull_number: pullRequestNumber,
  body: `### 🤖 ChatGPT Tags suggestions ✨
I've asked ChatGPT for some suggestions for tags.`,
  event: "COMMENT",
  comments,
});
