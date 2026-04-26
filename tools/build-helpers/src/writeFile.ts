/* eslint-disable import/prefer-default-export */
import fs from 'fs/promises';
import path from 'path';

/**
 * writes content to a file
 *
 * @param {string} content
 * @param {string} fileName
 * @param {string} outputDirectory
 */
export const writeFile = (
  content: string,
  fileName: string,
  outputDirectory: string,
): Promise<void> => fs.writeFile(path.join(outputDirectory, fileName), content, 'utf-8');
