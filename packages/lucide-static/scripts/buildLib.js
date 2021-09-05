import fs from 'fs';
import path from 'path';
import getArgumentOptions from 'minimist'; // eslint-disable-line import/no-extraneous-dependencies
import { format } from 'prettier';

// import renderIconsObject from '../../../scripts/render/renderIconsObject';
import { appendFile, readSvgDirectory, toCamelCase } from '../../../scripts/helpers';
import readSvgs from './readSvgs';
import { parseSync, stringify } from 'svgson';

const cliArguments = getArgumentOptions(process.argv.slice(2));
const createDirectory = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const PACKAGE_DIR = path.resolve(__dirname, '../');
const ICONS_DIR = path.join(PACKAGE_DIR, 'icons');
const LIB_DIR = path.join(PACKAGE_DIR, cliArguments.output || 'lib');
const ICON_MODULE_DIR = path.join(LIB_DIR, 'icons');

createDirectory(LIB_DIR);
createDirectory(ICON_MODULE_DIR);

const svgFiles = readSvgDirectory(ICONS_DIR);
const svgs = readSvgs(svgFiles, ICONS_DIR);

svgs.forEach(({ name, contents }) => {
  const componentName = toCamelCase(name);
  const importString = `module.exports.${componentName} = require('./icons/${name}');\n`;
  appendFile(importString, `index.js`, LIB_DIR);

  const exportString = `module.exports = \`${contents}\`;\n`;
  appendFile(exportString, `${name}.js`, ICON_MODULE_DIR);
});

const symbols = svgs.map(({ name, contents }) => {
  const parsedSvg = parseSync(contents);

  return {
    name: 'symbol',
    type: 'element',
    attributes: {
      id: name,
      viewBox: '0 0 24 24',
    },
    children: parsedSvg.children,
  };
});

const spriteSvgObject = {
  name: 'svg',
  type: 'element',
  attributes: {
    xmlns: 'http://www.w3.org/2000/svg',
  },
  children: [
    {
      name: 'defs',
      type: 'element',
      children: symbols,
    },
  ],
};

const spriteSvg = stringify(spriteSvgObject);
const prettifiedSprite = format(spriteSvg, { parser: 'babel' }).replace(/;/g, '');

appendFile(prettifiedSprite, `sprite.svg`, PACKAGE_DIR);
