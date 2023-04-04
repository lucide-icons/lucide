import fs from 'fs';
import path from 'path';
import processSvg from './render/processSvg.mjs';
import { readSvgDirectory, writeSvgFile } from './helpers.mjs';

const ICONS_DIR = path.resolve(process.cwd(), 'icons');

console.log(`Optimizing SVGs...`);

const svgFiles = readSvgDirectory(ICONS_DIR);

svgFiles.forEach((svgFile) => {
  const content = fs.readFileSync(path.join(ICONS_DIR, svgFile));
  processSvg(content, svgFile).then((svg) => writeSvgFile(svgFile, ICONS_DIR, svg));
});
