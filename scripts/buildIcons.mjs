import fs from 'fs';
import path from 'path';
import getArgumentOptions from 'minimist';

import renderIconsObject from './render/renderIconsObject.mjs';
import generateIconFiles from './building/generateIconFiles.mjs';
import generateExportsFile from './building/generateExportsFile.mjs';

import { readSvgDirectory, getCurrentDirPath } from './helpers.mjs';

const cliArguments = getArgumentOptions(process.argv.slice(2));

const currentDir = getCurrentDirPath(import.meta.url);

const ICONS_DIR = path.resolve(currentDir, '../icons');
const OUTPUT_DIR = path.resolve(process.cwd(), cliArguments.output || '../build');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

const {
  renderUniqueKey = false,
  templateSrc,
  silent = false,
  iconFileExtension = '.js',
  exportFileName = 'index.js',
  pretty = true,
} = cliArguments;

async function buildIcons() {
  if (templateSrc == null) {
    throw new Error('No `templateSrc` argument given.');
  }

  const svgFiles = readSvgDirectory(ICONS_DIR);

  const icons = renderIconsObject(svgFiles, ICONS_DIR, renderUniqueKey);

  const { default: iconFileTemplate } = await import(path.resolve(process.cwd(), templateSrc));

  // Generates iconsNodes files for each icon
  generateIconFiles({
    iconNodes: icons,
    outputDirectory: OUTPUT_DIR,
    template: iconFileTemplate,
    showLog: !silent,
    iconFileExtension,
    pretty: JSON.parse(pretty),
  });

  // Generates entry files for the compiler filled with icons exports
  generateExportsFile(
    path.join(OUTPUT_DIR, 'icons', exportFileName),
    path.join(OUTPUT_DIR, 'icons'),
    icons,
    iconFileExtension,
  );
}

try {
  buildIcons();
} catch (error) {
  console.error(error);
}
