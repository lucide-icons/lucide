/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';
import getArgumentOptions from 'minimist';
import { parseSync } from 'svgson';

import {
  appendFile,
  readSvgDirectory,
  toCamelCase,
  getCurrentDirPath,
} from '../../../scripts/helpers.mjs';
import readSvgs from './readSvgs.mjs';
import generateSprite from './generateSprite.mjs';
import generateIconNodes from './generateIconNodes.mjs';
import copyIcons from './copyIcons.mjs';

import pkg from '../package.json' assert { type: 'json' };

const cliArguments = getArgumentOptions(process.argv.slice(2));
const createDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const currentDir = getCurrentDirPath(import.meta.url);

const PACKAGE_DIR = path.resolve(currentDir, '../');
const ICONS_DIR = path.join(PACKAGE_DIR, '../../icons');
const LIB_DIR = path.join(PACKAGE_DIR, cliArguments.output || 'lib');
const ICON_MODULE_DIR = path.join(LIB_DIR, 'icons');

const license = `@license ${pkg.name} v${pkg.version} - ${pkg.license}`;

createDirectory(LIB_DIR);
createDirectory(ICON_MODULE_DIR);

const svgFiles = readSvgDirectory(ICONS_DIR);
const svgs = readSvgs(svgFiles, ICONS_DIR);

const jsLicense = `/**\n * ${license}\n */\n`;

appendFile(jsLicense, `index.js`, LIB_DIR);

svgs.forEach(({ name, contents }) => {
  const componentName = toCamelCase(name);
  const importString = `module.exports.${componentName} = require('./icons/${name}');\n`;
  appendFile(importString, `index.js`, LIB_DIR);

  const exportString = `${jsLicense}module.exports = \`${contents}\`;\n`;
  appendFile(exportString, `${name}.js`, ICON_MODULE_DIR);
});

const parsedSvgs = svgs.map(({ name, contents }) => ({
  name,
  contents,
  parsedSvg: parseSync(contents),
}));

generateSprite(parsedSvgs, PACKAGE_DIR, license);
generateIconNodes(parsedSvgs, PACKAGE_DIR);
copyIcons(parsedSvgs, PACKAGE_DIR, license);
