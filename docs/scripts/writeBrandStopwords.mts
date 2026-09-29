import fs from 'fs/promises';
import path from 'path';

const currentDir = process.cwd();
const dataDirectory = path.resolve(currentDir, '.vitepress/data');
const stopwordsSource = path.resolve(currentDir, `../brand-stopwords.json`);
const stopwordsFile = path.resolve(dataDirectory, `brandStopwords.json`);

fs.copyFile(stopwordsSource, stopwordsFile)
  .then(() => {
    console.log('Successfully copied brandStopwords.json file');
  })
  .catch((error) => {
    throw new Error(`Something went wrong generating the brandStopwords.json file,\n ${error}`);
  });
