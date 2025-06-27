/* eslint-disable import/no-extraneous-dependencies */
import { type INode, stringify } from 'svgson';
import { format } from 'prettier';
import { appendFile } from '@lucide/helpers';
import { type SVGFile } from './readSvgs.mts';

export default async function generateSprite(
  svgs: SVGFile[],
  packageDir: string,
  license: string
) {
  const symbols = svgs.map<INode>(({ name, parsedSvg }) => ({
    name: 'symbol',
    type: 'element',
    value: '',
    attributes: {
      id: name,
    },
    children: parsedSvg.children,
  }));

  const spriteSvgObject: INode = {
    name: 'svg',
    type: 'element',
    attributes: {
      xmlns: 'http://www.w3.org/2000/svg',
      version: '1.1',
    },
    value: '',
    children: [
      {
        name: 'defs',
        type: 'element',
        children: symbols,
        value: '',
      } as INode,
    ],
  };

  const spriteSvg = stringify(spriteSvgObject);
  const prettifiedSprite = (await format(spriteSvg, { parser: 'babel' })).replace(/;/g, '');

  const xmlMeta = `<?xml version="1.0" encoding="utf-8"?>\n<!-- ${license} -->\n`;

  await appendFile(xmlMeta, `sprite.svg`, packageDir);
  await appendFile(prettifiedSprite, `sprite.svg`, packageDir);
}
