import fs from 'fs';
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import getArgumentOptions from 'minimist';

import renderIconsObject from './render/renderIconsObject';
import renderIconNodes from './render/renderIconNodes';
import generateIconFiles from './build/generateIconFiles';
import generateExportsFile from './build/generateExportsFile';
import { readSvgDirectory } from './helpers';

/* eslint-disable import/no-dynamic-require */

const cliArguments = getArgumentOptions(process.argv.slice(2));

const ICONS_DIR = path.resolve(__dirname, '../icons');
const OUTPUT_DIR = path.resolve(__dirname, cliArguments.output || '../build');
const SRC_DIR = path.resolve(__dirname, '../src');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

const svgFiles = readSvgDirectory(ICONS_DIR);

const icons = renderIconsObject(svgFiles, ICONS_DIR);

const iconVNodes = renderIconNodes(icons, cliArguments);

const defaultIconFileTemplate = ({ componentName, iconName, children }) => `
    const ${componentName} = [
      '${iconName}',
      ${JSON.stringify(children)}
    ];

    export default ${componentName};
  `;

const iconFileTemplate = cliArguments.templateSrc
  ? require(cliArguments.templateSrc).default
  : defaultIconFileTemplate;

// Generates iconsNodes files for each icon
generateIconFiles(iconVNodes, OUTPUT_DIR, iconFileTemplate);

// Generates entry files for the compiler filled with icons exports
generateExportsFile(
  path.join(SRC_DIR, 'icons/index.js'),
  path.join(OUTPUT_DIR, 'icons'),
  iconVNodes,
);
