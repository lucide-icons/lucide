/* eslint-disable import/prefer-default-export */
import fs from 'fs/promises';
import path from 'path';

/**
 * Resets the file contents.
 *
 * @param {string} fileName
 * @param {string} outputDirectory
 */
export const resetFile = (fileName: string, outputDirectory: string): Promise<void> =>
  fs.writeFile(path.join(outputDirectory, fileName), '', 'utf-8');
