import { eventHandler, setResponseHeader, defaultContentType } from 'h3';
import { renderToString } from 'react-dom/server';
import React from 'react';
import Diff from '../../../lib/SvgPreview/Diff.tsx';

export default eventHandler((event) => {
  const { params } = event.context;

  const pathData = params.data.split('/');
  const data = pathData.at(-1).slice(0, -4);
  const [operation] = pathData;

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

  let oldSrc = '';
  if (operation.startsWith('rotate-')) {
    const degrees = parseInt(operation.replace('rotate-', ''));
    if (isNaN(degrees)) return '';
    oldSrc = `<g transform="rotate(${degrees} ${width / 2} ${height / 2})">${newSrc}</g>`;
  } else if (operation === 'flip-horizontal') {
    oldSrc = `<g transform="scale(1, -1) translate(0, -${height})">${newSrc}</g>`;
  } else if (operation === 'flip-vertical') {
    oldSrc = `<g transform="scale(-1, 1) translate(-${width}, 0)">${newSrc}</g>`;
  } else if (operation === 'flip-backslash') {
    oldSrc = `<g transform="rotate(90, ${width / 2}, ${height / 2}) scale(1, -1) translate(0, -${height})">${newSrc}</g>`;
  } else if (operation === 'flip-slash') {
    oldSrc = `<g transform="rotate(90, ${width / 2}, ${height / 2}) scale(-1, 1) translate(-${width}, 0)">${newSrc}</g>`;
  } else {
    return '';
  }

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
    </Diff>
  )
});
