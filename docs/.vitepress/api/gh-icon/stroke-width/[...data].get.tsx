import { eventHandler, setResponseHeader, defaultContentType } from 'h3';
import { renderToString } from 'react-dom/server';
import React from 'react';
import Icon from 'lucide-react/src/Icon';
import type { IconNode } from 'lucide-react/src/types';
import { parseSync } from 'svgson';

export default eventHandler((event) => {
  const { params } = event.context;

  const [strokeWidth, svgData] = params.data.split('/');
  const data = svgData.slice(0, -4);

  const src = Buffer.from(data, 'base64').toString('utf8');
  const iconNode = parseSync(src.includes('<svg') ? src : `<svg>${src}</svg>`).children.map(
    ({ name, attributes }) => [name, attributes],
  ) as IconNode;

  defaultContentType(event, 'image/svg+xml');
  setResponseHeader(event, 'Cache-Control', 'public,max-age=31536000');

  return renderToString(
    <Icon
      iconNode={iconNode}
      strokeWidth={strokeWidth}
    >
      <style>
        {`@media screen and (prefers-color-scheme: light) {
          svg { fill: transparent !important; }
        }
        @media screen and (prefers-color-scheme: dark) {
          svg { stroke: #fff; fill: transparent !important; }
        }`}
      </style>
    </Icon>,
  );
});
