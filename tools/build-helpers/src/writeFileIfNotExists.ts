/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import path from 'path';
import { writeFile } from './writeFile.ts';

/**
 * writes content to a file if it does not exist
 *
 * @param {string} content
 * @param {string} fileName
 * @param {string} outputDirectory
 */
export const writeFileIfNotExists = (
  content: string,
  fileName: string,
  outputDirectory: string,
): void => {
  if (!fs.existsSync(path.join(outputDirectory, fileName))) {
    writeFile(content, fileName, outputDirectory);
  }
};
