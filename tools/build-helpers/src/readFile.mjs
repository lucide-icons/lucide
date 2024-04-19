import fs from 'fs';
import path from 'path';

/**
 * Reads the file contents.
 *
 * @param {string} path
 * @returns {string} The contents of a file
 */
export const readFile = (entry) => fs.readFileSync(path.resolve(__dirname, '../', entry), 'utf-8');
