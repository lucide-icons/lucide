import fs from 'fs';
import path from 'path';
import { renderIconsObject } from '@lucide/build-icons';
import { readSvgDirectory, toCamelCase } from '@lucide/helpers';

const currentDir = process.cwd();
const ICONS_DIR = path.resolve(currentDir, '../lab');
const svgFiles = await readSvgDirectory(ICONS_DIR);
const icons = await renderIconsObject(svgFiles, ICONS_DIR, true);

const iconNodesDirectory = path.resolve(currentDir, '.vitepress/data/lab', 'iconNodes');

if (fs.existsSync(iconNodesDirectory)) {
  fs.rmSync(iconNodesDirectory, { recursive: true, force: true });
}

if (!fs.existsSync(iconNodesDirectory)) {
  fs.mkdirSync(iconNodesDirectory);
}

const iconIndexFile = path.resolve(iconNodesDirectory, `index.ts`);
const iconIndexFileImports: string[] = [];
const iconIndexFileNodes: string[] = [];
const iconIndexFileExports: string[] = [];
const iconIndexFileDefaultExports: string[] = [];

const writeIconFiles = Object.entries(icons).map(async ([iconName, { children }]) => {
  // We need to use .node.json because the there is a file called package, which is a reserved word for packages.
  const location = path.resolve(iconNodesDirectory, `${iconName}.node.json`);
  const iconNode = children.map(({ name, attributes }) => [name, attributes]);

  const output = JSON.stringify(iconNode, null, 2);
  await fs.promises.writeFile(location, output, 'utf-8');

  iconIndexFileImports.push(
    `import ${toCamelCase(iconName)}Json from './${iconName}.node.json' with { type: "json" };`,
  );
  iconIndexFileNodes.push(
    `const ${toCamelCase(iconName)}Node = ${toCamelCase(iconName)}Json as IconNode;`,
  );
  iconIndexFileExports.push(`  ${toCamelCase(iconName)}Node as ${toCamelCase(iconName)},`);
  iconIndexFileDefaultExports.push(`  '${iconName}': ${toCamelCase(iconName)}Node,`);
});

try {
  await Promise.all(writeIconFiles);
  await fs.promises.writeFile(
    iconIndexFile,
    `\
import type { IconNode } from '../../../theme/types';
${iconIndexFileImports.join('\n')}

${iconIndexFileNodes.join('\n')}

export {
${iconIndexFileExports.join('\n')}
}

export default {
${iconIndexFileDefaultExports.join('\n')}
} satisfies Record<string, IconNode>;
`,
    'utf-8',
  );

  console.log('Successfully write', writeIconFiles.length, 'iconNodes.');
} catch (error) {
  throw new Error(`Something went wrong generating iconNode files,\n ${error}`);
}
