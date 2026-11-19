import fs from 'fs';
import path from 'path';
import { getIconMetaData } from '@lucide/build-icons';
import { toCamelCase } from '@lucide/helpers';

const currentDir = process.cwd();
const ICONS_DIR = path.resolve(currentDir, '../icons');
const iconMetaData = await getIconMetaData(ICONS_DIR);

const iconDetailsDirectory = path.resolve(currentDir, '.vitepress/data', 'iconDetails');

if (fs.existsSync(iconDetailsDirectory)) {
  fs.rmSync(iconDetailsDirectory, { recursive: true, force: true });
}

if (!fs.existsSync(iconDetailsDirectory)) {
  fs.mkdirSync(iconDetailsDirectory);
}

const indexFile = path.resolve(iconDetailsDirectory, `index.ts`);

const writeIconFiles = Object.entries(iconMetaData).map(async ([iconName, metaData]) => {
  const location = path.resolve(iconDetailsDirectory, `${iconName}.ts`);
  const {
    tags,
    categories,
    contributors,
    aliases,
    deprecated,
    deprecationReason,
    toBeRemovedInVersion,
  } = metaData;

  const contents = `\
import iconNode from '../iconNodes/${iconName}.node.json' with { type: 'json' };
import releaseData from '../releaseMetadata/${iconName}.json' with { type: 'json' };
import popularity from '../iconPopularity/${iconName}.json' with { type: 'json' };
import { IconMetaData, IconNode } from '~/.vitepress/theme/types';

const metaData: IconMetaData = ${JSON.stringify({ tags, categories, contributors, aliases, deprecated, deprecationReason, toBeRemovedInVersion })};

const { tags, categories, contributors, aliases, deprecated, deprecationReason, toBeRemovedInVersion } = metaData;

const iconDetails = {
  name: '${iconName}',
  iconNode: iconNode as IconNode,
  contributors,
  tags,
  categories,
  aliases,
  deprecated,
  popularity,
  deprecationReason,
  toBeRemovedInVersion,
  ...releaseData,
};

export default iconDetails;
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
