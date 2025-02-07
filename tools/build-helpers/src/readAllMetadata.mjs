/* eslint-disable import/prefer-default-export */
import fs from 'fs/promises';
import path from 'path';
import { readMetadata } from './readMetadata.mjs';

/**
 * Reads metadata from the icons/categories directories
 *
 * @param {string} directory
 * @returns {object} A map of icon or category metadata
 */
export const readAllMetadata = async (directory) => {
  const directoryContent = await fs.readdir(directory);

  return directoryContent
    .filter((file) => path.extname(file) === '.json')
    .reduce((acc, fileName) => {
      acc[path.basename(fileName, '.json')] = readMetadata(fileName, directory);
      return acc;
    }, {});
};
