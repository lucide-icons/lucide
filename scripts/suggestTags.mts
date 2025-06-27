import OpenAI from "openai";
import { Octokit } from "@octokit/rest";

import path from "node:path";
import fs from "node:fs/promises";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const pullRequestNumber = Number(process.env.PULL_REQUEST_NUMBER);
const commitSha = process.env.COMMIT_SHA ?? "HEAD";

const owner = 'lucide-icons';
const repo = 'lucide';

const { data: files } = await octokit.pulls.listFiles({
  owner,
  repo,
  pull_number: pullRequestNumber,
});

const changedFiles = files
  .map((file) => file.filename)
  .filter((file) => file.startsWith('icons/') && file.includes('.json'))
  .filter((file, idx, arr) => arr.indexOf(file) === idx);;

if (changedFiles.length === 0) {
  console.log('No changed icons found');
  process.exit(0);
}

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const suggestionsByFile = changedFiles.map(async (file) => {
  const filePath = file.replace('.json', '');
  const iconName = filePath.split('/').pop();

  const input = `Create a list of tags for a \`${iconName}\` icon. Don't include words like: 'icon' and don't include spaces. Make sure you format the list in JSON and do not return any other text.`

  // const response = await client.responses.create({
  //     model: "gpt-4.1-nano",
  //     input,
  // });

  // const strippedResponse = response.output_text.replace(/^\s*```json\s*|\s*```$/g, '');
  // const suggestedTags = JSON.parse(strippedResponse)
  const suggestedTags = [
    'trash',      'delete',
    'remove',     'bin',
    'rubbish',    'discard',
    'garbage',    'waste',
    'binoculars', 'dump',
    'garbagecan', 'wastebasket',
    'recycle',    'kill',
    'cancel'
  ];

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

  const message = `I've asked ChatGPT for some suggestions for tags for the \`${iconName}\` icon. \nHere are the suggestions: \n\`\`\`suggestion\n"tags": ${JSON.stringify(tagSuggestionsWithoutDuplicates, null, 2)},\`\`\`
Try asking it your self if you want to get more suggestions. [Open ChatGPT](https://chatgpt.com/?q=${encodeURIComponent(input)})`;

  return {
    path: file,          // Required
    line: startLine,  // Required — line number in the file
    body: message,
  }
})

const comments = await Promise.all(suggestionsByFile)

await octokit.pulls.createReview({
  owner,
  repo,
  pull_number: pullRequestNumber,
  body: "🤖✨ ChatGPT Tags suggestions:",
  event: "COMMENT",
  comments,
});
