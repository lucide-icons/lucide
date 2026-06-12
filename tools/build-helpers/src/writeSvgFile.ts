/* eslint-disable import/prefer-default-export */
import fs from 'fs/promises';
import path from 'path';

/**
 * writes content to a file
 *
 * @param {string} fileName
 * @param {string} outputDirectory
 * @param {string} content
 */
export const writeSvgFile = (
  fileName: string,
  outputDirectory: string,
  content: string,
): Promise<void> => fs.writeFile(path.join(outputDirectory, fileName), content, 'utf-8');
