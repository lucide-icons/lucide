import fs from 'fs';
import path from 'path';
import getArgumentOptions from 'minimist'; // eslint-disable-line import/no-extraneous-dependencies

// import renderIconsObject from '../../../scripts/render/renderIconsObject';
import { appendFile, readSvgDirectory } from '../../../scripts/helpers';
import readSvgs from './readSvgs';

const cliArguments = getArgumentOptions(process.argv.slice(2));

const ICONS_DIR = path.resolve(__dirname, '../icons');
const OUTPUT_DIR = path.resolve(__dirname, cliArguments.output || '../lib');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

const svgFiles = readSvgDirectory(ICONS_DIR);
const svgs = readSvgs(svgFiles, ICONS_DIR);

svgs.forEach(({ name, contents }) => {
  const importString = `export { default as ${componentName} } from './${iconName}';\n`;
  appendFile(importString, fileName, outputDirectory);
  appendFile(importString, fileName, outputDirectory);
});

console.log(svgs);
