import fs from 'fs';
import path from 'path';
import { readSvgDirectory, toCamelCase } from './helpers.mjs';

const currentDir = process.cwd();
const ICONS_DIR = path.resolve(currentDir, '../icons');
const iconJsonFiles = readSvgDirectory(ICONS_DIR, '.json');

if (fs.existsSync(path.resolve(currentDir, 'iconMetaData.ts'))) {
  fs.unlinkSync(path.resolve(currentDir, 'iconMetaData.ts'));
}

const location = path.resolve(currentDir, `iconMetaData.ts`);

let outputString = '';

iconJsonFiles.forEach((iconJsonFile) => {
  const iconName = path.basename(iconJsonFile, '.json');
  outputString += `export { default as ${toCamelCase(
    iconName,
  )} } from '../icons/${iconName}.json';\n`;
});

fs.promises
  .writeFile(location, outputString, 'utf-8')
  .then(() => {
    console.log('Successfully write icon json file index');
  })
  .catch((error) => {
    throw new Error(`Something went wrong generating icon json file index file,\n ${error}`);
  });
