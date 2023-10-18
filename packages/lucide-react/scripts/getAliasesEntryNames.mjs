import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import getAliases from '@lucide/build-icons/utils/getAliases.mjs';

const ICONS_DIR = path.resolve(process.cwd(), '../../icons');

export default async function getAliasesEntryNames() {
  const metaJsonFiles = await getAliases(ICONS_DIR);

  const iconWithAliases = Object.values(metaJsonFiles).filter(({ aliases }) => aliases != null);

  const aliases = iconWithAliases.flatMap(({ aliases }) => aliases);

  return aliases.map((alias) => path.join('src/icons', `${alias}.ts`));
}
