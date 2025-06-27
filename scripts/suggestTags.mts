import OpenAI from "openai";
import { notice } from '@actions/core';

import path from "node:path";
import fs from "node:fs/promises";


const changedFilesPathString = process.env.CHANGED_FILES;

if (changedFilesPathString == null) {
  console.error('CHANGED_FILES env variable is not set');
  process.exit(1);
}

const changedFiles = changedFilesPathString
  .split(' ')
  .filter((file) => file.includes('.json'))
  .filter((file, idx, arr) => arr.indexOf(file) === idx);

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

  const input = `Create a list of tags for a \`${iconName}\` icon. Don't include words like: 'icon' and don't include spaces. Make sure you format the list in JSON and do not return any other text.`

  const response = await client.responses.create({
      model: "gpt-4.1-nano",
      input,
  });

  const strippedResponse = response.output_text.replace(/^\s*```json\s*|\s*```$/g, '');
  const suggestedTags = JSON.parse(strippedResponse)

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

  const message = `I've asked ChatGPT for some suggestions for tags for the \`${iconName}\` icon. \nHere are the suggestions: \nsuggestion\`\`\`"tags": ${JSON.stringify(tagSuggestionsWithoutDuplicates, null, 2)},\`\`\`
  Try asking it your self if you want to get more suggestions. [Open ChatGPT](https://chatgpt.com/?q=${encodeURIComponent(input)})`;

  notice(message, {
    title: `Suggested tags for ${iconName}`,
    file,
    startLine,
    startColumn: 3,
  })

  return Promise.resolve()
})

Promise.all(suggestionsByFile)
