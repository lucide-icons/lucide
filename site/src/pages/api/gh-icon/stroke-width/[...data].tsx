import { parseSync } from 'svgson';
import { createLucideIcon, IconNode } from 'lucide-react';

export default async function handler(req, res) {
  // ReactDOMServer needs to be imported dynamically
  // https://github.com/vercel/next.js/issues/43810
  const ReactDOMServer = (await import('react-dom/server')).default;

  const url = req.url.split('/');
  const src = Buffer.from(url.at(-1).slice(0, -4), 'base64').toString('utf8');

  const Icon = createLucideIcon(
    'icon',
    parseSync(src.includes('<svg') ? src : `<svg>${src}</svg>`).children.map(
      ({ name, attributes }) => [name, attributes]
    ) as IconNode
  );

  const svg = Buffer.from(
    ReactDOMServer.renderToString(<Icon strokeWidth={url.at(-2)} />).replace(
      />/,
      '><style>@media screen and (prefers-color-scheme: dark) { svg { stroke: #fff } }</style>'
    )
  );

  res.setHeader('Cache-Control', 'public,max-age=31536000');
  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).end(svg);
}
