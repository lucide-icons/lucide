/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import path from 'path';
import { readMetadata } from './readMetadata.mjs';

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
    .reduce((acc, fileName) => {
      acc[path.basename(fileName, '.json')] = readMetadata(fileName, directory);
      return acc;
    }, {});
