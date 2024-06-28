import { eventHandler, setResponseHeader, defaultContentType } from 'h3';
import { Resvg, initWasm } from '@resvg/resvg-wasm';
import wasm from './loadWasm';

var initializedResvg = initWasm(wasm);

export default eventHandler(async (event) => {
  const { params = {} } = event.context;
  await initializedResvg;

  const imageSize = 96;
  const [iconSizeString, svgData] = params.data.split('/');
  const iconSize = parseInt(iconSizeString, 10);
  const data = svgData.slice(0, -4);

  const src = Buffer.from(data, 'base64').toString('utf8');
  const svg = (src.includes('<svg') ? src : `<svg>${src}</svg>`)
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(
      /<svg[^>]*/,
      `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${iconSize}"
  height="${iconSize}"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#fff"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
`,
    );

  const resvg = new Resvg(svg, { background: '#000' });
  const pngData = resvg.render();
  const pngBuffer = Buffer.from(pngData.asPng());

  defaultContentType(event, 'image/svg+xml');
  setResponseHeader(event, 'Cache-Control', 'public,max-age=31536000');

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${imageSize}" height="${imageSize}" viewBox="0 0 ${imageSize} ${imageSize}">
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
      height="${imageSize}"
      href="data:image/png;base64,${pngBuffer.toString('base64')}"
      image-rendering="pixelated"
    />
  </mask>
  <rect
    id="fallback-background"
    width="${imageSize}"
    height="${imageSize}" ry="${imageSize / 24}"
    fill="#fff"
  />
  <rect
    width="${imageSize}"
    height="${imageSize}"
    fill="#000"
    mask="url(#mask)"
  />
</svg>`;
});
