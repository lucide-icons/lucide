import path from 'path';
import { stringify, parseSync } from 'svgson';
import prettier from 'prettier';
import { appendFile, readSvgDirectory, getCurrentDirPath } from './helpers.mjs';

import readSvgs from '../packages/lucide-static/scripts/readSvgs.mjs';

const currentDir = getCurrentDirPath(import.meta.url);

const ICONS_DIR = path.resolve('icons');
const PACKAGE_DIR = path.resolve(currentDir);

export default function generateSprite(svgs, packageDir) {
  const symbols = svgs.map(({ parsedSvg }, index) => {
    const itemsPerRow = 10;
    const numInRow = index % itemsPerRow;
    const column = numInRow + 1;
    const row = (index - numInRow) / itemsPerRow + 1;
    return {
      name: 'g',
      type: 'element',
      attributes: {
        transform: `translate(${column * 24 - 24},${row * 24 - 24})`,
      },
      children: [parsedSvg],
    };
  });

  const spriteSvgObject = {
    name: 'svg',
    type: 'element',
    attributes: {
      xmlns: 'http://www.w3.org/2000/svg',
      version: '1.1',
    },
    children: symbols,
  };

  const spriteSvg = stringify(spriteSvgObject);
  const prettifiedSprite = prettier.format(spriteSvg, { parser: 'babel' }).replace(/;/g, '');

  const xmlMeta = `<?xml version="1.0" encoding="utf-8"?>\n`;

  appendFile(xmlMeta, `super-sprite.svg`, packageDir);
  appendFile(prettifiedSprite, `super-sprite.svg`, packageDir);
}

const svgFiles = readSvgDirectory(ICONS_DIR);
const svgs = readSvgs(svgFiles, ICONS_DIR);

const parsedSvgs = svgs.map(({ name, contents }) => ({
  name,
  contents,
  parsedSvg: parseSync(contents),
}));

generateSprite(parsedSvgs, PACKAGE_DIR);
