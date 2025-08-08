import { eventHandler, setResponseHeader, defaultContentType } from 'h3';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import SvgPreview from '../../../lib/SvgPreview/index.tsx';
import createLucideIcon, { IconNode } from 'lucide-react/src/createLucideIcon';
import { parseSync } from 'svgson';

export default eventHandler((event) => {
  const { params } = event.context;

  const [strokeWidth, svgData] = params.data.split('/');
  const data = svgData.slice(0, -4);

  const src = Buffer.from(data, 'base64').toString('utf8');

  const Icon = createLucideIcon(
    'icon',
    parseSync(src.includes('<svg') ? src : `<svg>${src}</svg>`).children.map(
      ({ name, attributes }) => [name, attributes],
    ) as IconNode,
  );

  const svg = Buffer.from(
    // We can't use jsx here, is not supported here by nitro.
    renderToString(createElement(Icon, { strokeWidth }))
      .replace(/fill\="none"/, 'fill="#fff"')
      .replace(
        />/,
        `><style>
        :root { color-scheme: light dark }
        * { stroke: currentColor }
        _::-webkit-full-page-media, _:future, :root * {
          stroke: #fff;
          mix-blend-mode: difference;
        }
      </style>`,
      ),
  ).toString('utf8');

  defaultContentType(event, 'image/svg+xml');
  setResponseHeader(event, 'Cache-Control', 'public,max-age=31536000');

  return svg;
});
