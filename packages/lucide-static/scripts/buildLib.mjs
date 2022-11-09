/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';
import getArgumentOptions from 'minimist';
import { parseSync } from 'svgson';

import { appendFile, readSvgDirectory, toCamelCase, getCurrentDirPath } from '../../../scripts/helpers.mjs';
import readSvgs from './readSvgs.mjs';
import generateSprite from './generateSprite.mjs';
import generateIconNodes from './generateIconNodes.mjs';

const cliArguments = getArgumentOptions(process.argv.slice(2));
const createDirectory = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const currentDir = getCurrentDirPath(import.meta.url)

const PACKAGE_DIR = path.resolve(currentDir, '../');
const ICONS_DIR = path.join(PACKAGE_DIR, 'icons');
const LIB_DIR = path.join(PACKAGE_DIR, cliArguments.output || 'lib');
const ICON_MODULE_DIR = path.join(LIB_DIR, 'icons');

createDirectory(LIB_DIR);
createDirectory(ICON_MODULE_DIR);

const svgFiles = readSvgDirectory(ICONS_DIR);
const svgs = readSvgs(svgFiles, ICONS_DIR);

svgs.forEach(({ name, contents }) => {
  const componentName = toCamelCase(name);
  const importString = `module.exports.${componentName} = require('./icons/${name}');\n`;
  appendFile(importString, `index.js`, LIB_DIR);

  const exportString = `module.exports = \`${contents}\`;\n`;
  appendFile(exportString, `${name}.js`, ICON_MODULE_DIR);
});

const parsedSvgs = svgs.map(({ name, contents }) => ({
  name,
  contents,
  parsedSvg: parseSync(contents),
}));

generateSprite(parsedSvgs, PACKAGE_DIR);
generateIconNodes(parsedSvgs, PACKAGE_DIR);
