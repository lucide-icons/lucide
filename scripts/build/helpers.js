import upperCamelCase from 'upperCamelCase';
import fs from 'fs';
import path from 'path';

/**
 * Generates a componentName of a String.
 *
 * @param {string} iconName
 */
export const generateComponentName = (iconName) => iconName === "github" ? "GitHub" : upperCamelCase(iconName);

export const resetFile = (fileName, outputDirectory) => fs.writeFileSync(path.join(outputDirectory, fileName), "", "utf-8");

export const writeFile = (content, fileName, outputDirectory) => fs.appendFileSync(
  path.join(outputDirectory, fileName),
  content,
  "utf-8"
);
