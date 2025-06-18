import path from 'path';
import { readSvgDirectory } from '@lucide/helpers';
import { Path } from '../types';

async function getAliases(iconDirectory: Path) {
  const iconJsons = await readSvgDirectory(iconDirectory, '.json');
  const aliasesEntries = await Promise.all(
    iconJsons.map(async (jsonFile) => {
      const file = await import(path.join(iconDirectory, jsonFile), { with: { type: 'json' } });
      return [path.basename(jsonFile, '.json'), file.default];
    }),
  );

  return Object.fromEntries(aliasesEntries);
}

export default getAliases;
