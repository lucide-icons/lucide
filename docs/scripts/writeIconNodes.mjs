import fs from 'fs';
import path from 'path';
import { renderIconsObject } from '@lucide/build-icons';
import { readSvgDirectory, toCamelCase } from '@lucide/helpers';

const currentDir = process.cwd();
const ICONS_DIR = path.resolve(currentDir, '../icons');
const svgFiles = await readSvgDirectory(ICONS_DIR);
const icons = await renderIconsObject(svgFiles, ICONS_DIR, true);

const iconNodesDirectory = path.resolve(currentDir, '.vitepress/data', 'iconNodes');

if (fs.existsSync(iconNodesDirectory)) {
  fs.rmSync(iconNodesDirectory, { recursive: true, force: true });
}

if (!fs.existsSync(iconNodesDirectory)) {
  fs.mkdirSync(iconNodesDirectory);
}

const iconIndexFile = path.resolve(iconNodesDirectory, `index.ts`);
const iconIndexFileImports = [];
const iconIndexFileExports = [];
const iconIndexFileDefaultExports = [];

const writeIconFiles = Object.entries(icons).map(async ([iconName, { children }]) => {
  // We need to use .node.json because the there is a file called package, which is a reserved word for packages.
  const location = path.resolve(iconNodesDirectory, `${iconName}.node.json`);
  const iconNode = children.map(({ name, attributes }) => [name, attributes]);

  const output = JSON.stringify(iconNode, null, 2);
  await fs.promises.writeFile(location, output, 'utf-8');

  iconIndexFileImports.push(
    `import ${toCamelCase(iconName)}Node from './${iconName}.node.json' with { type: "json" };`,
  );
  iconIndexFileExports.push(`  ${toCamelCase(iconName)}Node as ${toCamelCase(iconName)},`);
  iconIndexFileDefaultExports.push(`  '${iconName}': ${toCamelCase(iconName)}Node,`);
});

try {
  await Promise.all(writeIconFiles);
  await fs.promises.writeFile(
    iconIndexFile,
    `\
${iconIndexFileImports.join('\n')}

export {
${iconIndexFileExports.join('\n')}
}

export default {
${iconIndexFileDefaultExports.join('\n')}
}
  `,
    'utf-8',
  );

  console.log('Successfully write', writeIconFiles.length, 'iconNodes.');
} catch (error) {
  throw new Error(`Something went wrong generating iconNode files,\n ${error}`);
}
