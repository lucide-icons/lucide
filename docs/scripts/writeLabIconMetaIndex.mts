import fs from 'fs';
import path from 'path';
import { readSvgDirectory, toCamelCase } from '@lucide/helpers';

const currentDir = process.cwd();
const ICONS_DIR = path.resolve(currentDir, '../lab');
const iconJsonFiles = await readSvgDirectory(ICONS_DIR, '.json');

const labDirectory = path.resolve(currentDir, '.vitepress/data/lab');
const location = path.resolve(currentDir, labDirectory, 'iconMetaData.ts');

if (fs.existsSync(location)) {
  fs.unlinkSync(location);
}

if (!fs.existsSync(labDirectory)) {
  fs.mkdirSync(labDirectory);
}

const iconMetaIndexFileImports = [];
const iconMetaIndexFileExports = [];

iconJsonFiles.forEach((iconJsonFile) => {
  const iconName = path.basename(iconJsonFile, '.json');

  iconMetaIndexFileImports.push(
    `import ${toCamelCase(iconName)}Metadata from '../../../../lab/${iconName}.json';`,
  );
  iconMetaIndexFileExports.push(`  '${iconName}': ${toCamelCase(iconName)}Metadata,`);
});

try {
  await fs.promises.writeFile(
    location,
    `\
${iconMetaIndexFileImports.join('\n')}


  export default {
${iconMetaIndexFileExports.join('\n')}
  }
    `,
    'utf-8',
  );

  console.log('Successfully write icon json file index');
} catch (error) {
  throw new Error(`Something went wrong generating icon json file index file,\n ${error}`);
}
