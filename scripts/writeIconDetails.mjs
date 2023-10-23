import fs from 'fs';
import path from 'path';
import renderIconsObject from './render/renderIconsObject.mjs';
import { readSvgDirectory, toCamelCase } from './helpers.mjs';

const currentDir = process.cwd();
const ICONS_DIR = path.resolve(currentDir, '../icons');
const icons = readSvgDirectory(ICONS_DIR, '.json');

const iconDetailsDirectory = path.resolve(currentDir, '.vitepress/data', 'iconDetails');

if (fs.existsSync(iconDetailsDirectory)) {
  fs.rmSync(iconDetailsDirectory, { recursive: true, force: true });
}

if (!fs.existsSync(iconDetailsDirectory)) {
  fs.mkdirSync(iconDetailsDirectory);
}

const indexFile = path.resolve(iconDetailsDirectory, `index.ts`);

const writeIconFiles = icons.map(async (iconFileName) => {
  const iconName = path.basename(iconFileName, '.json');
  const location = path.resolve(iconDetailsDirectory, `${iconName}.ts`);

  const contents = `\
import iconNode from '../iconNodes/${iconName}.node.json'
import metaData from '../../../../icons/${iconName}.json'
import releaseData from '../releaseMetadata/${iconName}.json'

const { tags, categories } = metaData

const iconDetails = {
  name: '${iconName}',
  iconNode,
  contributors: ['ericfennis', 'karsa-mistmere'],
  tags,
  categories,
  ...releaseData,
}

export default iconDetails
  `;

  await fs.promises.writeFile(location, contents, 'utf-8');
  await fs.promises.appendFile(
    indexFile,
    `export { default as ${toCamelCase(iconName)} } from './${iconName}';\n`,
    'utf-8',
  );
});

Promise.all(writeIconFiles)
  .then(() => {
    console.log('Successfully write', writeIconFiles.length, 'iconDetails files.');
  })
  .catch((error) => {
    throw new Error(`Something went wrong generating iconNode files,\n ${error}`);
  });
