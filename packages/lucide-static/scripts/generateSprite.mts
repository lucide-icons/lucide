import { type INode, stringify } from 'svgson';
import { format } from 'prettier';
import { appendFile } from '@lucide/helpers';
import { type SVGFile } from './readSvgs.mts';

export type AliasSVGFile = SVGFile & {
  /** Name of the icon this alias points to. */
  aliasOf: string;
};

export default async function generateSprite(
  svgs: SVGFile[],
  aliases: AliasSVGFile[],
  packageDir: string,
  license: string
) {
  const symbols = svgs.map<INode>(({ name, parsedSvg }) => ({
    name: 'symbol',
    type: 'element',
    value: '',
    attributes: {
      id: name,
      viewBox: parsedSvg.attributes.viewBox,
    },
    children: parsedSvg.children,
  }));

  // Aliases reference the original icon's symbol instead of duplicating its elements.
  const aliasSymbols = aliases.map<INode>(({ name, aliasOf, parsedSvg }) => ({
    name: 'symbol',
    type: 'element',
    value: '',
    attributes: {
      id: name,
      viewBox: parsedSvg.attributes.viewBox,
    },
    children: [
      {
        name: 'use',
        type: 'element',
        value: '',
        attributes: {
          href: `#${aliasOf}`,
        },
        children: [],
      },
    ],
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
        children: [...symbols, ...aliasSymbols],
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
