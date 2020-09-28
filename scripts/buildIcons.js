import fs from 'fs';
import path from 'path';

import renderIconsObject from './render/renderIconsObject';
import renderIconNodes from './render/renderIconNodes';
import generateIconFiles from './build/generateIconFiles';
import generateExportsFile from './build/generateExportsFile';

import { readSvgDirectory } from './helpers';

const ICONS_DIR = path.resolve(__dirname, '../icons');
const OUTPUT_DIR = path.resolve(__dirname, '../build');
const SRC_DIR = path.resolve(__dirname, '../src');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

const svgFiles = readSvgDirectory(ICONS_DIR);

const icons = renderIconsObject(svgFiles, ICONS_DIR);

const iconVNodes = renderIconNodes(icons);

// Generates iconsNodes files for each icon
generateIconFiles(
  iconVNodes,
  OUTPUT_DIR,
  ({ componentName, node }) => `
    const ${componentName} = ${node};

    export default ${componentName};
  `,
);

// Generates entry files for the compiler filled with icons exports
generateExportsFile(
  path.join(SRC_DIR, 'icons/index.js'),
  path.join(OUTPUT_DIR, 'icons'),
  'getElement',
  iconVNodes,
);
