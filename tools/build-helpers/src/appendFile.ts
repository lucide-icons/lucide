/* eslint-disable import/prefer-default-export */
import fs from 'fs/promises';
import path from 'path';

/**
 * append content to a file
 *
 * @param {string} content
 * @param {string} fileName
 * @param {string} outputDirectory
 */
export const appendFile = (
  content: string,
  fileName: string,
  outputDirectory: string,
): Promise<void> => fs.appendFile(path.join(outputDirectory, fileName), content, 'utf-8');
