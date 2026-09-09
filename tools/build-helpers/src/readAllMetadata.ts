import fs from 'fs/promises';
import path from 'path';
import { readMetadata } from './readMetadata.ts';
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

  return Object.fromEntries(metadata);
};
