// import OpenAI from "openai";

const changedFilesPathString = process.env.CHANGED_FILES;

if (changedFilesPathString == null) {
  console.error('CHANGED_FILES env variable is not set');
  process.exit(1);
}

const changedFiles = changedFilesPathString
  .split(' ')
  .filter((file) => file.includes('.json') && )
  .filter((file, idx, arr) => arr.indexOf(file) === idx);

if (changedFiles.length === 0) {
  console.log('No changed icons found');
  process.exit(0);
}

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const response = await client.responses.create({
//     model: "gpt-4.1-nano",
//     input: "Create a list of tags for a `trashcan` icon. Don't include words like: 'icon'. Make sure you format the list in JSON and do not return any other text."
// });

// const strippedResponse = response.output_text.replace(/^\s*```json\s*|\s*```$/g, '');
// const suggestedTags = JSON.parse(strippedResponse)

const suggestedTags = [
  'trash',      'bin',
  'waste',      'garbage',
  'delete',     'remove',
  'recycle',    'discard',
  'binoculars', 'rubbish',
  'empty',      'deletion',
  'cleanup',    'junk',
  'clear'
];

const suggestionsByFile = changedFiles.forEach((file) => {
  const filePath = file.replace('.json', '');
  const iconName = filePath.split('/').pop();


  // Log to the actions console
  core.error('Missing semicolon', {file, startLine: 1})

  // const iconContent = JSON.stringify(
  //   {
  //     $schema: '../icon.schema.json',
  //     tags: suggestedTags,
  //     categories: [],
  //   },
  //   null,
  //   2,
  // );

  // const fs = require('fs');
  // const path = require('path');
  // const outputPath = path.resolve(__dirname, '..', 'icons', `${iconName}.json`);

  // fs.writeFileSync(outputPath, iconContent);
  // console.log(`Updated tags for ${iconName}`);
})
