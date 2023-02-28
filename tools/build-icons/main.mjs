#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import getArgumentOptions from 'minimist';

import renderIconsObject from './render/renderIconsObject.mjs';
import generateIconFiles from './building/generateIconFiles.mjs';
import generateExportsFile from './building/generateExportsFile.mjs';

import { readSvgDirectory, getCurrentDirPath } from '../../scripts/helpers.mjs';
import generateAliasesFile from './building/generateAliasesFile.mjs';
import getAliases from './utils/getAliases.mjs';

const cliArguments = getArgumentOptions(process.argv.slice(2));

const currentDir = getCurrentDirPath(import.meta.url);

const ICONS_DIR = path.resolve(currentDir, '../../icons');
const OUTPUT_DIR = path.resolve(process.cwd(), cliArguments.output || '../build');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

const {
  renderUniqueKey = false,
  templateSrc,
  silent = false,
  iconFileExtension = '.js',
  importImportFileExtension = '',
  exportFileName = 'index.js',
  withAliases = false,
  aliasesFileExtension = '.js',
  aliasImportFileExtension = '',
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

  if (withAliases) {
    const aliases = await getAliases(ICONS_DIR);

    generateAliasesFile({
      iconNodes: icons,
      aliases,
      outputDirectory: OUTPUT_DIR,
      fileExtension: aliasesFileExtension,
      aliasImportFileExtension,
      showLog: !silent,
    });
  }

  // Generates entry files for the compiler filled with icons exports
  generateExportsFile(
    path.join(OUTPUT_DIR, 'icons', exportFileName),
    path.join(OUTPUT_DIR, 'icons'),
    icons,
    importImportFileExtension,
  );
}

try {
  buildIcons();
} catch (error) {
  console.error(error);
}
