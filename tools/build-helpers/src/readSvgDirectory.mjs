import fs from 'fs';
import path from 'path';

/**
 * reads the icon directory
 *
 * @param {string} directory
 * @returns {array} An array of file paths containig svgs
 */
export const readSvgDirectory = (directory, fileExtension = '.svg') =>
  fs.readdirSync(directory).filter((file) => path.extname(file) === fileExtension);
