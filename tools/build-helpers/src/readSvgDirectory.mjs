/* eslint-disable import/prefer-default-export */
import fs from 'fs';
import path from 'path';

/**
 * reads the icon directory
 *
 * @param {string} directory
 * @param {string} fileExtension
 * @returns {array} An array of file paths containing svgs
 */
export const readSvgDirectory = (directory, fileExtension = '.svg') =>
  fs.readdirSync(directory).filter((file) => path.extname(file) === fileExtension);
