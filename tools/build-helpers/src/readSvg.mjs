/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import path from 'path';

/**
 * Read svg from directory
 *
 * @param {string} fileName
 * @param {string} directory
 */
export const readSvg = (fileName, directory) =>
  fs.readFileSync(path.join(directory, fileName), 'utf-8');
