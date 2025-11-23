import { eventHandler, setResponseHeader, defaultContentType } from 'h3';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
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

  const oldSrc = iconNodes[name]
    ? renderToStaticMarkup(createElement(createLucideIcon(name, iconNodes[name])))
        .replaceAll('\n', '')
        .replace(/<svg[^>]*>|<\/svg>/g, '')
    : '';

  const svg = Buffer.from(
    // We can't use jsx here, is not supported here by nitro.
    renderToString(
      createElement(Diff, { oldSrc, newSrc, showGrid: true, height, width }, children),
    ),
  ).toString('utf8');

  defaultContentType(event, 'image/svg+xml');
  setResponseHeader(event, 'Cache-Control', 'public,max-age=31536000');

  return svg;
});
