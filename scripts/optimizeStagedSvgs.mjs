import fs from 'fs';
import { processSvg } from '@lucide/build-icons';

const svgFiles = process.argv.slice(2);

svgFiles.forEach(async (svgFile) => {
  console.log('Optimizing staged SVG file:', svgFile);
  const content = fs.readFileSync(svgFile);
  const svg = await processSvg(content, svgFile);
  fs.writeFileSync(svgFile, svg, 'utf-8');
});
