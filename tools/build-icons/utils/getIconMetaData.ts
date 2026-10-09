import path from 'path';
import { readSvgDirectory } from '@lucide/helpers';
import { type IconMetadata } from '../types.ts';
import { resolveMetadataExtends } from '../../build-helpers/src/resolveMetadataExtends.ts';

async function getIconMetaData(iconDirectory: string): Promise<Record<string, IconMetadata>> {
  const iconJsons = await readSvgDirectory(iconDirectory, '.json');
  const aliasesEntries = await Promise.all(
    iconJsons.map(async (jsonFile: string) => {
      /** eslint-disable */
      const file = await import(path.join(iconDirectory, jsonFile), { with: { type: 'json' } });
      return [path.basename(jsonFile, '.json'), file.default];
    }),
  );

  const metadataMap = Object.fromEntries(aliasesEntries);

  // Resolve extends references
  return await resolveMetadataExtends(metadataMap);
}

export default getIconMetaData;
