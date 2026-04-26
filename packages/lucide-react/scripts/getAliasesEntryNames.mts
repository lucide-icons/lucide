import path from 'path';
import getIconMetaData from '@lucide/build-icons/utils/getIconMetaData';

const ICONS_DIR = path.resolve(process.cwd(), '../../icons');

const ignoreAliases = ['fingerprint'];

export default async function getAliasesEntryNames() {
  const metaJsonFiles = await getIconMetaData(ICONS_DIR);

  const iconWithAliases = Object.values(metaJsonFiles).filter(({ aliases }) => aliases != null);

  const aliases = iconWithAliases.flatMap(({ aliases }) => aliases);

  return aliases.filter(alias => !ignoreAliases.includes(alias.name)).map((alias) => path.join('src/icons', `${alias.name}.ts`));
}
