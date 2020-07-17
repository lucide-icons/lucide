import fs from 'fs';
import path from 'path';

import renderIconsObject from './render/renderIconsObject';
import renderIconVNodes from './render/renderIconVNodes';
import generateIconFiles from './build/generateIconFiles';
import generateExportsFile from './build/generateExportsFile';

const IN_DIR = path.resolve(__dirname, '../icons');
const OUTPUT_DIR = path.resolve(__dirname, '../src');

if (!fs.existsSync(OUTPUT_DIR)){
  fs.mkdirSync(OUTPUT_DIR);
}

const svgFiles = fs.readdirSync(IN_DIR).filter(file => path.extname(file) === '.svg');
const getSvg = svgFile => fs.readFileSync(path.join(IN_DIR, svgFile));

const icons = renderIconsObject(svgFiles, getSvg);
const iconVNodes = renderIconVNodes(icons);

generateIconFiles(iconVNodes, OUTPUT_DIR);

generateExportsFile('index.js', OUTPUT_DIR, 'getElement', iconVNodes);
generateExportsFile('react.js', OUTPUT_DIR, 'getReactComponent', iconVNodes);
generateExportsFile('vue.js', OUTPUT_DIR, 'getVueComponent', iconVNodes);
