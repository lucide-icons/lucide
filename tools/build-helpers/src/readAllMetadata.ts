import fs from 'fs/promises';
import path from 'path';
import { readMetadata } from './readMetadata.ts';
import { resolveMetadataExtends } from './resolveMetadataExtends.ts';
import { type IconMetadata } from '../../build-icons/types.ts';

/**
 * Reads metadata from the icons/categories directories
 *
 * @param {string} directory
 * @returns {object} A map of icon or category metadata
 */
export const readAllMetadata = async (directory: string): Promise<Record<string, IconMetadata>> => {
  const directoryContent = await fs.readdir(directory);

  const metaDataPromises = directoryContent
    .filter((file) => path.extname(file) === '.json')
    .map(async (file) => [path.basename(file, '.json'), await readMetadata(file, directory)]);

  const metadata = await Promise.all(metaDataPromises);

  if (metadata.length === 0) {
    throw new Error(`No metadata files found in directory: ${directory}`);
  }

  const metadataMap = Object.fromEntries(metadata);

  // Resolve extends references
  try {
    return await resolveMetadataExtends(metadataMap);
  } catch (error) {
    throw new Error(
      `Failed to resolve metadata extends: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
