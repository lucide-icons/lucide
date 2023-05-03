import fs from 'fs';
import path from 'path';
import renderIconsObject from './render/renderIconsObject.mjs';
import { readSvgDirectory, toCamelCase } from './helpers.mjs';

const currentDir = process.cwd();
const ICONS_DIR = path.resolve(currentDir, '../icons');
const svgFiles = readSvgDirectory(ICONS_DIR);
const icons = renderIconsObject(svgFiles, ICONS_DIR, true);

const iconNodesDirectory = path.resolve(currentDir, '.vitepress/data', 'iconNodes');

if (fs.existsSync(iconNodesDirectory)) {
  fs.rmSync(iconNodesDirectory, { recursive: true, force: true });
}

if (!fs.existsSync(iconNodesDirectory)) {
  fs.mkdirSync(iconNodesDirectory);
}

const writeIconFiles = Object.entries(icons).map(async ([iconName, { children }]) => {
  const location = path.resolve(iconNodesDirectory, `${iconName}.node.json`);
  const iconNode = children.map(({ name, attributes }) => [name, attributes]);

  const output = JSON.stringify(iconNode, null, 2);
  await fs.promises.writeFile(location, output, 'utf-8');

  const indexFile = path.resolve(iconNodesDirectory, `index.ts`);
  await fs.promises.appendFile(
    indexFile,
    `export { default as ${toCamelCase(iconName)} } from './${iconName}.node.json';\n`,
    'utf-8',
  );
});

Promise.all(writeIconFiles)
  .then(() => {
    console.log('Successfully write', writeIconFiles.length, 'iconNodes.');
  })
  .catch((error) => {
    throw new Error(`Something went wrong generating iconNode files,\n ${error}`);
  });
