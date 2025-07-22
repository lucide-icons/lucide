/* eslint-disable import/prefer-default-export */
import fs from 'fs/promises';
import path from 'path';

/**
 * Read svg from directory
 *
 * @param {string} fileName
 * @param {string} directory
 */
export const readSvg = (fileName: string, directory: string): Promise<string> =>
  fs.readFile(path.join(directory, fileName), 'utf-8');
