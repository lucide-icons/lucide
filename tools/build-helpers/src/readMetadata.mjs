/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import path from 'path';

/**
 * Reads metadata for an icon or category
 *
 * @param {string} fileName
 * @param {string} directory
 * @returns {object} The metadata for the icon or category
 */
export const readMetadata = (fileName, directory) =>
  JSON.parse(fs.readFileSync(path.join(directory, fileName), 'utf-8'));
