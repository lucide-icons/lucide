import upperCamelCase from 'upperCamelCase';
import fs from 'fs';
import path from 'path';

/**
 * Generates a componentName of a String.
 *
 * @param {string} iconName
 */
export const generateComponentName = (iconName) => iconName === "github" ? "GitHub" : upperCamelCase(iconName);

/**
 * Resets the file contents.
 *
 * @param {string} fileName
 * @param {string} outputDirectory
 */
export const resetFile = (fileName, outputDirectory) => fs.writeFileSync(path.join(outputDirectory, fileName), "", "utf-8");

/**
 * writes content to a file
 *
 * @param {string} content
 * @param {string} fileName
 * @param {string} outputDirectory
 */
export const writeFile = (content, fileName, outputDirectory) => fs.appendFileSync(
  path.join(outputDirectory, fileName),
  content,
  "utf-8"
);
