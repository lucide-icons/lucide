import fs from 'fs';
import path from 'path';
import { readSvgDirectory, writeSvgFile } from '../tools/build-helpers/helpers.ts';
import processSvg from './render/processSvg.mts';

const ICONS_DIR = path.resolve(process.cwd(), 'icons');

console.log(`Optimizing SVGs...`);

const svgFiles = await readSvgDirectory(ICONS_DIR);

svgFiles.forEach((svgFile: string) => {
  const content = fs.readFileSync(path.join(ICONS_DIR, svgFile), 'utf-8');
  processSvg(content, svgFile).then((svg) => writeSvgFile(svgFile, ICONS_DIR, svg));
});
