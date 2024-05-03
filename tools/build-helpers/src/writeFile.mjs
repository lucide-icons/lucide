/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import path from 'path';

/**
 * writes content to a file
 *
 * @param {string} content
 * @param {string} fileName
 * @param {string} outputDirectory
 */
export const writeFile = (content, fileName, outputDirectory) =>
  fs.writeFileSync(path.join(outputDirectory, fileName), content, 'utf-8');
