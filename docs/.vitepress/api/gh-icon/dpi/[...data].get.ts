import { eventHandler, setResponseHeader, defaultContentType } from 'h3';
import Canvas, { Canvas as CanvasType } from 'canvas';
import { DOMParser } from 'xmldom';
import { Canvg, presets } from 'canvg';

const preset = presets.node({ DOMParser, canvas: Canvas, fetch });

const createRasterizedIcon = (svg: string, imageSize: number) => {
  const canvas = preset.createCanvas(imageSize, imageSize);
  const ctx = canvas.getContext('2d');

  Canvg.fromString(ctx, svg, preset).render();

  return canvas;
};

export default eventHandler((event) => {
  const { params = {} } = event.context;

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
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
`
    );

  const canvas: CanvasType = preset.createCanvas(imageSize, imageSize);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#FFF';
  ctx.fillRect(0, 0, imageSize, imageSize);

  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#FFF';
  ctx.drawImage(createRasterizedIcon(svg, iconSize), 0, 0, imageSize, imageSize);

  // invert color so the image can be used as an svg mask
  ctx.globalCompositeOperation = 'difference';
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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
      href="data:image/png;base64,${canvas.toBuffer().toString('base64')}"
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
