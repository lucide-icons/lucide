import fs from 'fs';
import processSvg from './render/processSvg.mjs';

const svgFiles = process.argv.slice(4);

svgFiles.forEach(async svgFile => {
  const content = fs.readFileSync(svgFile);
  const svg = await processSvg(content);
  fs.writeFileSync(svgFile, svg, 'utf-8');
});
