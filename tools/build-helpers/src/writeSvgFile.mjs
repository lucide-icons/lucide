/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import path from 'path';

/**
 * writes content to a file
 *
 * @param {string} fileName
 * @param {string} outputDirectory
 * @param {string} content
 */
export const writeSvgFile = (fileName, outputDirectory, content) =>
  fs.writeFileSync(path.join(outputDirectory, fileName), content, 'utf-8');
