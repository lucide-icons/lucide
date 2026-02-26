// import { eventHandler, setResponseHeader, defaultContentType } from 'h3';
// import { Resvg, initWasm } from '@resvg/resvg-wasm';
import iconNodes from '../../../data/iconNodes';
// import wasm from './loadWasm';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import createLucideIcon from 'lucide-react/src/createLucideIcon';

// var initializedResvg = initWasm(wasm);

export default eventHandler(async (event) => {
  const { params = {} } = event.context;
  // await initializedResvg;

  const imageSize = 96;
  const name = params.data.split('/').at(-3);
  const iconSizeString = params.data.split('/').at(-2);
  const svgData = params.data.split('/').at(-1);
  const iconSize = parseInt(iconSizeString, 10);
  const data = svgData.slice(0, -4);

  const prevSvg = iconNodes[name]
    ? renderToStaticMarkup(createElement(createLucideIcon(name, iconNodes[name])))
    : undefined;

  const src = Buffer.from(data, 'base64').toString('utf8');
  const svg = (src.includes('<svg') ? src : `<svg>${src}</svg>`)
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(
      /<svg[^>]*>/,
      `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${iconSize}"
  height="${prevSvg ? iconSize * 2 : iconSize}"
  viewBox="0 0 24 ${prevSvg ? 48 : 24}"
  fill="none"
  stroke="#fff"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  >
  ${prevSvg?.replaceAll('\n', '').replace(/<svg[^>]*>|<\/svg>/g, '')}
  <g transform="translate(0, ${prevSvg ? 24 : 0})">
`,
    )
    .replace(/<\/svg>/, '</g></svg>');

  // const resvg = new Resvg(svg, { background: '#000' });
  // const pngData = resvg.render();
  // const pngBuffer = Buffer.from(pngData.asPng());

  defaultContentType(event, 'image/svg+xml');
  setResponseHeader(event, 'Cache-Control', 'public,max-age=31536000');

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${imageSize}" height="${prevSvg ? imageSize * 2 : imageSize}" viewBox="0 0 ${imageSize} ${prevSvg ? imageSize * 2 : imageSize}">
  <style>
    @media screen and (prefers-color-scheme: light) {
      #fallback-background { fill: transparent; }
    }
    @media screen and (prefers-color-scheme: dark) {
      #fallback-background { fill: transparent; }
      rect { fill: #fff; }
    }
  </style>
  <mask id="mask">
    <image
      width="${imageSize}"
      height="${prevSvg ? imageSize * 2 : imageSize}"
      href="data:image/png;base64,${'asd'}"
      image-rendering="pixelated"
    />
  </mask>
  <rect
    id="fallback-background"
    width="100%"
    height="100%" ry="${imageSize / 24}"
    fill="#fff"
  />
  <rect
    width="100%"
    height="100%"
    fill="#000"
    mask="url(#mask)"
  />
</svg>`;
});
