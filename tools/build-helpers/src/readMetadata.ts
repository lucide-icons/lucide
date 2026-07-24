/* eslint-disable import/prefer-default-export */
import fs from 'fs/promises';
import path from 'path';

/**
 * Reads metadata for an icon or category
 *
 * @param {string} fileName
 * @param {string} directory
 * @returns {object} The metadata for the icon or category
 */
export const readMetadata = async (fileName: string, directory: string): Promise<unknown> => {
  let metadataFileContent: string | Buffer = await fs.readFile(
    path.join(directory, fileName),
    'utf-8',
  );

  if (Buffer.isBuffer(metadataFileContent)) {
    metadataFileContent = metadataFileContent.toString('utf-8');
  }

  return JSON.parse(metadataFileContent);
};
