/* eslint-disable import/no-extraneous-dependencies */
import { stringify } from 'svgson';
import { format } from 'prettier';
import { appendFile } from '../../../scripts/helpers.mjs';

export default function generateSprite(svgs, packageDir) {
  const symbols = svgs.map(({ name, parsedSvg }) => ({
    name: 'symbol',
    type: 'element',
    attributes: {
      id: name,
    },
    children: parsedSvg.children,
  }));

  const spriteSvgObject = {
    name: 'svg',
    type: 'element',
    attributes: {
      xmlns: 'http://www.w3.org/2000/svg',
      version: '1.1',
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

  const xmlMeta = `<?xml version="1.0" encoding="utf-8"?>\n`;

  appendFile(xmlMeta, `sprite.svg`, packageDir);
  appendFile(prettifiedSprite, `sprite.svg`, packageDir);
}
