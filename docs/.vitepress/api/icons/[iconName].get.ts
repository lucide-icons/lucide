import { eventHandler, getQuery, setResponseHeader, createError } from 'h3';
import iconNodes from '../../data/iconNodes';
import createLucideIcon from 'lucide-react/src/createLucideIcon';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';

export default eventHandler((event) => {
  const { params } = event.context;

  const iconNode = iconNodes[params.iconName];

  if (iconNode == null) {
    const error = createError({
      statusCode: 404,
      message: `Icon "${params.iconName}" not found`,
    });

    return sendError(event, error);
  }

  const query = getQuery<Record<string, string | undefined>>(event);
  const width = query.width || undefined;
  const height = query.height || undefined;
  const color = query.color || undefined;
  const strokeWidth = query.strokeWidth || undefined;
  const background = query.background || undefined;

  const LucideIcon = createLucideIcon(params.iconName, iconNode);

  const svg = Buffer.from(
    renderToString(
      createElement(LucideIcon, {
        width,
        height,
        color: color ? `#${color}` : undefined,
        strokeWidth,
        style: background ? { background } : undefined,
      }),
    ),
  ).toString('utf8');

  defaultContentType(event, 'image/svg+xml');
  setResponseHeader(event, 'Cache-Control', 'public,max-age=31536000');
  setResponseHeader(event, 'Access-Control-Allow-Origin', '*');

  return svg;
});
