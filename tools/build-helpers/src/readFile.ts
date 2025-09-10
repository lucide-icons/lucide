/* eslint-disable import/prefer-default-export */
import fs from 'fs/promises';
import path from 'path';

/**
 * Reads the file contents.
 *
 * @param {string} path
 * @returns {string} The contents of a file
 */
export const readFile = (filePath: string): Promise<string | Buffer> =>
  fs.readFile(path.resolve(__dirname, '../', filePath), 'utf-8');
