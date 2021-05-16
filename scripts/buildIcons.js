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

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

const {
  renderUniqueKey = false,
  templateSrc = './templates/defaultIconFileTemplate',
  silent = false,
  iconFileExtention = '.js',
  exportFileName = 'index.js',
} = cliArguments;

const svgFiles = readSvgDirectory(ICONS_DIR);

const icons = renderIconsObject(svgFiles, ICONS_DIR, renderUniqueKey);

// eslint-disable-next-line import/no-dynamic-require
const iconFileTemplate = require(templateSrc).default;

// Generates iconsNodes files for each icon
generateIconFiles({
  iconNodes: icons,
  outputDirectory: OUTPUT_DIR,
  template: iconFileTemplate,
  showLog: !silent,
  iconFileExtention,
});

// Generates entry files for the compiler filled with icons exports
generateExportsFile(
  path.join(OUTPUT_DIR, 'icons', exportFileName),
  path.join(OUTPUT_DIR, 'icons'),
  icons,
);
