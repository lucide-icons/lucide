/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import path from 'path';

/**
 * Reads the file contents.
 *
 * @param {string} path
 * @returns {string} The contents of a file
 */
export const readFile = (path) => fs.readFileSync(path.resolve(__dirname, '../', path), 'utf-8');
