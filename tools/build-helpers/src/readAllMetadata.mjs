import fs from 'fs';
import path from 'path';

/**
 * Reads metadata from the icons/categories directories
 *
 * @param {string} directory
 * @returns {object} A map of icon or category metadata
 */
export const readAllMetadata = (directory) =>
  fs
    .readdirSync(directory)
    .filter((file) => path.extname(file) === '.json')
    .reduce((acc, fileName, i) => {
      acc[path.basename(fileName, '.json')] = readMetadata(fileName, directory);
      return acc;
    }, {});
