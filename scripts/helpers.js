// eslint-disable-next-line import/no-extraneous-dependencies
import { upperFirst, camelCase } from 'lodash/string';
import fs from 'fs';
import path from 'path';

/**
 * Generates a componentName of a String.
 *
 * @param {string} iconName
 */
export const generateComponentName = iconName =>
  iconName === 'github' ? 'GitHub' : upperFirst(camelCase(iconName));

/**
 * Resets the file contents.
 *
 * @param {string} fileName
 * @param {string} outputDirectory
 */
export const resetFile = (fileName, outputDirectory) =>
  fs.writeFileSync(path.join(outputDirectory, fileName), '', 'utf-8');

/**
 * Reads the file contents.
 *
 * @param {string} path
 */
export const readFile = entry => fs.readFileSync(path.resolve(__dirname, '../', entry), 'utf-8');

/**
 * append content to a file
 *
 * @param {string} content
 * @param {string} fileName
 * @param {string} outputDirectory
 */
export const appendFile = (content, fileName, outputDirectory) =>
  fs.appendFileSync(path.join(outputDirectory, fileName), content, 'utf-8');

/**
 * writes content to a file
 *
 * @param {string} content
 * @param {string} fileName
 * @param {string} outputDirectory
 */
export const writeFile = (content, fileName, outputDirectory) =>
  fs.writeFileSync(path.join(outputDirectory, fileName), content, 'utf-8');

/**
 * reads the icon directory
 *
 * @param {string} directory
 */
export const readSvgDirectory = directory =>
  fs.readdirSync(directory).filter(file => path.extname(file) === '.svg');

/**
 * Read svg from directory
 *
 * @param {string} fileName
 * @param {string} directory
 */
export const readSvg = (fileName, directory) => fs.readFileSync(path.join(directory, fileName));

/**
 * writes content to a file
 *
 * @param {string} fileName
 * @param {string} outputDirectory
 * @param {string} content
 */
export const writeSvgFile = (fileName, outputDirectory, content) =>
  fs.appendFileSync(path.join(outputDirectory, fileName), content, 'utf-8');
