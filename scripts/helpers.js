import fs from 'fs';
import path from 'path';

/**
 * Converts string to PascalCase
 *
 * @param {string} string
 */
export const toCamelCase = string =>
  string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) =>
    p2 ? p2.toUpperCase() : p1.toLowerCase(),
  );

/**
 * Converts string to PascalCase
 *
 * @param {string} string
 */
export const toPascalCase = string => {
  const camelCase = toCamelCase(string);

  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

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
