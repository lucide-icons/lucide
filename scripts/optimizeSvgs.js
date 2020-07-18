import fs from 'fs';
import path from 'path';

const ICONS_DIR = path.resolve(__dirname, '../icons');

console.log(`Optimizing SVGs in ${ICONS_DIR}...`);

const svgFiles = fs.readdirSync(ICONS_DIR).filter(file => path.extname(file) === '.svg');
console.log(svgFiles);

svgFiles
  .filter(file => path.extname(file) === '.svg')
  .forEach(svgFile => {
    const svg = fs.readFileSync(path.join(ICONS_DIR, svgFile));
    processSvg(svg).then(svg =>
      fs.writeFileSync(path.join(ICONS_DIR, svgFile), svg),
    );
  });
