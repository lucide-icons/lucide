import fs from 'fs';
import path from 'path';

import renderIconsObject from './render/renderIconsObject';
import renderIconVNodes from './render/renderIconVNodes';
import generateIconFiles from './build/generateIconFiles';
import generateReactFile from './build/generateReactFile';



const IN_DIR = path.resolve(__dirname, '../icons');
// const OUT_FILE = path.resolve(__dirname, '../dist/icons.json');

// console.log(`Building ${OUT_FILE}...`);

const svgFiles = fs.readdirSync(IN_DIR).filter(file => path.extname(file) === '.svg');
const getSvg = svgFile => fs.readFileSync(path.join(IN_DIR, svgFile));

const icons = renderIconsObject(svgFiles, getSvg);
const iconVnodes = renderIconVNodes(icons);

// generateIconFiles(iconVnodes);
generateReactFile(iconVnodes);
