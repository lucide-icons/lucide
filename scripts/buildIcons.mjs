import fs from 'fs';
import path from 'path';
import getArgumentOptions from 'minimist'; // eslint-disable-line import/no-extraneous-dependencies

import renderIconsObject from './render/renderIconsObject.mjs';
import generateIconFiles from './building/generateIconFiles.mjs';
import generateExportsFile from './building/generateExportsFile.mjs';

import { readSvgDirectory, __dirname } from './helpers.mjs';

const cliArguments = getArgumentOptions(process.argv.slice(2));

const ICONS_DIR = path.resolve(__dirname, '../icons');
const OUTPUT_DIR = path.resolve(__dirname, cliArguments.output || '../build');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

const {
  renderUniqueKey = false,
  templateSrc = './templates/defaultIconFileTemplate.mjs',
  silent = false,
  iconFileExtention = '.js',
  exportFileName = 'index.js',
  pretty = true,
} = cliArguments;

async function buildIcons() {

const svgFiles = readSvgDirectory(ICONS_DIR);

const icons = renderIconsObject(svgFiles, ICONS_DIR, renderUniqueKey);


const {default: iconFileTemplate} = await import(templateSrc);

// Generates iconsNodes files for each icon
generateIconFiles({
  iconNodes: icons,
  outputDirectory: OUTPUT_DIR,
  template: iconFileTemplate,
  showLog: !silent,
  iconFileExtention,
  pretty: JSON.parse(pretty),
});

// Generates entry files for the compiler filled with icons exports
generateExportsFile(
  path.join(OUTPUT_DIR, 'icons', exportFileName),
  path.join(OUTPUT_DIR, 'icons'),
  icons,
  iconFileExtention,
);
}

buildIcons()
