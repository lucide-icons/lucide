import fs from 'fs';
import path from 'path';

import renderIconsObject from './render/renderIconsObject';
import renderIconNodes from './render/renderIconNodes';
import generateIconFiles from './build/generateIconFiles';
import generateExportsFile from './build/generateExportsFile';

const IN_DIR = path.resolve(__dirname, '../icons');
const OUTPUT_DIR = path.resolve(__dirname, '../build');
const SRC_DIR = path.resolve(__dirname, '../src');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

const svgFiles = fs.readdirSync(IN_DIR).filter(file => path.extname(file) === '.svg');
const getSvg = svgFile => fs.readFileSync(path.join(IN_DIR, svgFile));

const icons = renderIconsObject(svgFiles, getSvg);
const iconVNodes = renderIconNodes(icons);

// Generates iconsNodes files for each icon
generateIconFiles(iconVNodes, OUTPUT_DIR);

// Generates entry files for the compiler filled with icons exports
generateExportsFile(
  path.join(SRC_DIR, 'icons/index.js'),
  path.join(OUTPUT_DIR, 'icons'),
  'getElement',
  iconVNodes,
);
// generateExportsFile('react.js', OUTPUT_DIR, 'getReactComponent', iconVNodes);
// generateExportsFile('vue.js', OUTPUT_DIR, 'getVueComponent', iconVNodes);
