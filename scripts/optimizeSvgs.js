import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve(__dirname, '../dist/icons');

console.log(`Optimizing SVGs in ${OUT_DIR}...`);

const svgFiles = fs.readdirSync(IN_DIR).filter(file => path.extname(file) === '.svg');
console.log(svgFiles);


// Object.keys(icons).forEach(name => {
//   const svg = icons[name].toSvg();

//   fs.writeFileSync(path.join(OUT_DIR, `${name}.svg`), svg);
// });
