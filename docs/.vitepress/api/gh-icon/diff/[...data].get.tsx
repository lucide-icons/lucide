import { eventHandler, setResponseHeader, defaultContentType } from 'h3';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import Diff from '../../../lib/SvgPreview/Diff.tsx';
import iconNodes from '../../../data/iconNodes';
import createLucideIcon from 'lucide-react/src/createLucideIcon';

export default eventHandler((event) => {
  const { params } = event.context;

  const pathData = params.data.split('/');
  const data = pathData.at(-1).slice(0, -4);
  const [name] = pathData;

  const newSrc = Buffer.from(data, 'base64')
    .toString('utf8')
    .replaceAll('\n', '')
    .replace(/<svg[^>]*>|<\/svg>/g, '');

  const width = parseInt(
    (newSrc.includes('<svg ') ? newSrc.match(/width="(\d+)"/)?.[1] : null) ?? '24',
  );
  const height = parseInt(
    (newSrc.includes('<svg ') ? newSrc.match(/height="(\d+)"/)?.[1] : null) ?? '24',
  );

  const children = [];

  const Icon = createLucideIcon(name, iconNodes[name]);

  const oldSrc = iconNodes[name]
    ? renderToStaticMarkup(<Icon />)
        .replaceAll('\n', '')
        .replace(/<svg[^>]*>|<\/svg>/g, '')
    : '';

  defaultContentType(event, 'image/svg+xml');
  setResponseHeader(event, 'Cache-Control', 'public,max-age=31536000');

  return renderToString(
    <Diff
      oldSrc={oldSrc}
      newSrc={newSrc}
      showGrid
      height={height}
      width={width}
    >
      {children}
    </Diff>,
  );
});
