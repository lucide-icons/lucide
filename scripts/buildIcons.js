import fs from 'fs';
import path from 'path';
import getArgumentOptions from 'minimist'; // eslint-disable-line import/no-extraneous-dependencies

import renderIconsObject from './render/renderIconsObject';
import generateIconFiles from './build/generateIconFiles';
import generateExportsFile from './build/generateExportsFile';

import { readSvgDirectory } from './helpers';

const cliArguments = getArgumentOptions(process.argv.slice(2));

const ICONS_DIR = path.resolve(__dirname, '../icons');
const OUTPUT_DIR = path.resolve(__dirname, cliArguments.output || '../build');
const SRC_DIR = path.resolve(__dirname, '../src');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

const svgFiles = readSvgDirectory(ICONS_DIR);

const icons = renderIconsObject(svgFiles, ICONS_DIR, cliArguments.renderUniqueKey);

const defaultIconFileTemplate = './templates/defaultIconFileTemplate';
// eslint-disable-next-line import/no-dynamic-require
const iconFileTemplate = require(cliArguments.templateSrc || defaultIconFileTemplate).default;

// Generates iconsNodes files for each icon
generateIconFiles(icons, OUTPUT_DIR, iconFileTemplate, { showLog: !cliArguments.silent });

// Generates entry files for the compiler filled with icons exports
generateExportsFile(path.join(SRC_DIR, 'icons/index.js'), path.join(OUTPUT_DIR, 'icons'), icons);
