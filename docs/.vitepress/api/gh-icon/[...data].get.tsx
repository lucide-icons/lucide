import { eventHandler, setResponseHeader, defaultContentType } from 'h3';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import SvgPreview from '../../lib/SvgPreview/index.tsx';
import iconNodes from '../../data/iconNodes';
import createLucideIcon from 'lucide-react/src/createLucideIcon';
import Backdrop from '../../lib/SvgPreview/Backdrop.tsx';

export default eventHandler((event) => {
  const { params } = event.context;

  const pathData = params.data.split('/');
  const data = pathData.at(-1).slice(0, -4);
  const [name] = pathData;

  const src = Buffer.from(data, 'base64').toString('utf8').replaceAll('\n', '');

  const width = parseInt((src.includes('<svg ') ? src.match(/width="(\d+)"/)?.[1] : null) ?? '24');
  const height = parseInt(
    (src.includes('<svg ') ? src.match(/height="(\d+)"/)?.[1] : null) ?? '24',
  );

  const children = [];

  // Finds the longest matching icon to be use as the backdrop.
  // For `square-dashed-bottom-code` it suggests `square-dashed-bottom-code`.
  // For `square-dashed-bottom-i-dont-exist` it suggests `square-dashed-bottom`.
  const backdropName = name
    .split('-')
    .map((_, idx, arr) => arr.slice(0, idx + 1).join('-'))
    .reverse()
    .find((groupName) => groupName in iconNodes);
  if (!(name in iconNodes) && backdropName) {
    const iconNode = iconNodes[backdropName];

    const LucideIcon = createLucideIcon(backdropName, iconNode);
    const svg = renderToStaticMarkup(<LucideIcon/>);
    const backdropString = svg.replaceAll('\n', '').replace(/<svg[^>]*>|<\/svg>/g, '');

    children.push(
      <Backdrop
        backdropString={backdropString}
        src={src.replace(/<svg[^>]*>|<\/svg>/g, '')}
        color="#777"
      />
    );
  }

  defaultContentType(event, 'image/svg+xml');
  setResponseHeader(event, 'Cache-Control', 'public,max-age=31536000');

  return renderToString(
    <SvgPreview
      src={src.replace(/<svg[^>]*>|<\/svg>/g, '')}

      showGrid
      height={height}
      width={width}
    >
      {children}
    </SvgPreview>
  )
});
