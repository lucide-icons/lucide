#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import getArgumentOptions from 'minimist';

import { readSvgDirectory } from '@lucide/helpers';
import renderIconsObject from './render/renderIconsObject.ts';
import generateIconFiles from './building/generateIconFiles.ts';
import generateExportsFile from './building/generateExportsFile.ts';

import generateAliasesFiles from './building/aliases/generateAliasesFiles.ts';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import getIconMetaData from './utils/getIconMetaData.ts';
import generateDynamicImports from './building/generateDynamicImports.ts';

interface CliArguments {
  renderUniqueKey?: boolean;
  templateSrc?: string;
  silent?: boolean;
  iconFileExtension?: string;
  importImportFileExtension?: string;
  exportFileName?: string;
  exportModuleNameCasing?: 'camel' | 'pascal';
  withAliases?: boolean;
  aliasNamesOnly?: boolean;
  withDynamicImports?: boolean;
  separateAliasesFile?: boolean;
  separateAliasesFileExtension?: string;
  separateAliasesFileIgnore?: string;
  separateIconFileExport?: boolean;
  separateIconFileExportExtension?: string;
  aliasesFileExtension?: string;
  aliasImportFileExtension?: string;
  useDefaultExports?: boolean;
  pretty?: boolean;
  output: string | undefined;
}

const cliArguments = getArgumentOptions(process.argv.slice(2)) as unknown as CliArguments;

const ICONS_DIR = path.resolve(process.cwd(), '../../icons');
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
  exportModuleNameCasing = 'pascal',
  withAliases = false,
  aliasNamesOnly = false,
  withDynamicImports = false,
  separateAliasesFile = false,
  separateAliasesFileExtension = undefined,
  separateAliasesFileIgnore = undefined,
  separateIconFileExport = false,
  separateIconFileExportExtension = undefined,
  aliasesFileExtension = '.js',
  aliasImportFileExtension = '',
  useDefaultExports = true,
  pretty = true,
} = cliArguments;

async function buildIcons() {
  if (templateSrc == null) {
    throw new Error('No `templateSrc` argument given.');
  }

  const svgFiles = await readSvgDirectory(ICONS_DIR);

  const icons = await renderIconsObject(svgFiles, ICONS_DIR, renderUniqueKey);

  const { default: iconFileTemplate } = await import(path.resolve(process.cwd(), templateSrc));

  const iconMetaData = await getIconMetaData(ICONS_DIR);

  // Generates iconsNodes files for each icon
  await generateIconFiles({
    iconNodes: icons,
    outputDirectory: OUTPUT_DIR,
    template: iconFileTemplate,
    showLog: !silent,
    iconFileExtension,
    separateIconFileExport,
    separateIconFileExportExtension,
    pretty: JSON.parse(String(pretty)),
    iconsDir: ICONS_DIR,
    iconMetaData,
  });

  if (withAliases) {
    await generateAliasesFiles({
      iconNodes: icons,
      iconMetaData,
      aliasNamesOnly,
      iconFileExtension,
      outputDirectory: OUTPUT_DIR,
      fileExtension: aliasesFileExtension,
      aliasImportFileExtension,
      separateAliasesFile,
      separateAliasesFileExtension,
      separateAliasesFileIgnore,
      showLog: !silent,
    });
  }

  if (withDynamicImports) {
    await generateDynamicImports({
      iconNodes: icons,
      outputDirectory: OUTPUT_DIR,
      fileExtension: aliasesFileExtension,
      iconMetaData,
      showLog: !silent,
    });
  }

  // Generates entry files for the compiler filled with icons exports
  await generateExportsFile(
    path.join(OUTPUT_DIR, 'icons', exportFileName),
    path.join(OUTPUT_DIR, 'icons'),
    icons,
    exportModuleNameCasing,
    importImportFileExtension,
    useDefaultExports
  );
}

try {
  await buildIcons();
} catch (error) {
  console.error(error);
}
