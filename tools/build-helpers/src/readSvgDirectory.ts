/* eslint-disable import/prefer-default-export */
import { type PathLike } from 'fs';
import fs from 'fs/promises';
import path from 'path';

/**
 * reads the icon directory
 *
 * @param {string} directory
 * @param {string} fileExtension
 * @returns {array} An array of file paths containing svgs
 */
export const readSvgDirectory = async (
  directory: PathLike,
  fileExtension: string = '.svg',
): Promise<string[]> => {
  const directoryContents = await fs.readdir(directory);

  return directoryContents.filter((file) => path.extname(file) === fileExtension);
};
