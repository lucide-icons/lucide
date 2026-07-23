import path from 'path';
import { readSvgDirectory } from '@lucide/helpers';
import getIconMetaData from '@lucide/build-icons/utils/getIconMetaData';

const ICONS_DIR = path.resolve(process.cwd(), '../../icons');

const ignoreAliases = ['fingerprint'];

export default async function getIconEntryNamesAndAliases() {
  const svgFiles = await readSvgDirectory(ICONS_DIR);
  const iconNames = svgFiles.map((file) => path.basename(file, '.svg'));

  const metaJsonFiles = await getIconMetaData(ICONS_DIR);
  const iconWithAliases = Object.values(metaJsonFiles).filter(({ aliases }) => aliases != null);

  const aliases = iconWithAliases.flatMap(({ aliases }) => aliases ?? []);
  const aliasNames = aliases
    .filter((alias) => !ignoreAliases.includes(alias.name))
    .map((alias) => alias.name);

  // Return an object mapping the entry name to its source path so Rollup uses the
  // key as the `[name]` placeholder and emits declaration files flat in the output
  // directory instead of preserving the `src/icons/` directory structure.
  return Object.fromEntries(
    [...iconNames, ...aliasNames].map((name) => [name, path.join('src/icons', `${name}.ts`)]),
  );
}
