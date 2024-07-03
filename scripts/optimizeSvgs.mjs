import fs from 'fs';
import path from 'path';
import { readSvgDirectory, writeSvgFile } from '../tools/build-helpers/helpers.mjs';
import processSvg from './render/processSvg.mjs';

const ICONS_DIR = path.resolve(process.cwd(), 'icons');

console.log(`Optimizing SVGs...`);

const svgFiles = readSvgDirectory(ICONS_DIR);

svgFiles.forEach((svgFile) => {
  const content = fs.readFileSync(path.join(ICONS_DIR, svgFile));
  processSvg(content, svgFile).then((svg) => writeSvgFile(svgFile, ICONS_DIR, svg));
});
