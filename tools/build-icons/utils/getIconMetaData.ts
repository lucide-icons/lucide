import path from 'path';
import { pathToFileURL } from 'url';
import { readSvgDirectory, readGroups } from '@lucide/helpers';
import { type IconMetadata } from '../types.ts';
import { resolveMetadataExtends } from '../../build-helpers/src/resolveMetadataExtends.ts';

async function getIconMetaData(iconDirectory: string): Promise<Record<string, IconMetadata>> {
  const iconJsons = await readSvgDirectory(iconDirectory, '.json');
  const aliasesEntries = await Promise.all(
    iconJsons.map(async (jsonFile: string) => {
      /** eslint-disable */
      const file = await import(pathToFileURL(path.join(iconDirectory, jsonFile)).href, {
        with: { type: 'json' },
      });
      return [path.basename(jsonFile, '.json'), file.default];
    }),
  );

  const metadataMap = Object.fromEntries(aliasesEntries);

  // Resolve extends and group references
  const groups = await readGroups();

  return await resolveMetadataExtends(metadataMap, { groups });
}

export default getIconMetaData;
