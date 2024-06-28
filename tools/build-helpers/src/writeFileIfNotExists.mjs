/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import path from 'path';
import { writeFile } from './writeFile.mjs';

/**
 * writes content to a file if it does not exist
 *
 * @param {string} content
 * @param {string} fileName
 * @param {string} outputDirectory
 */
export const writeFileIfNotExists = (content, fileName, outputDirectory) => {
  if (!fs.existsSync(path.join(outputDirectory, fileName))) {
    writeFile(content, fileName, outputDirectory);
  }
};
