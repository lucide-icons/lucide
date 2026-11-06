import { defineHandler, getQuery, HTTPError } from 'nitro/h3';
import iconNodes from '~/.vitepress/data/iconNodes';
import createLucideIcon from 'lucide-react/src/createLucideIcon';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';

export default defineHandler((event) => {
  const { params } = event.context;

  const iconNode = iconNodes[params.iconName];

  if (iconNode == null) {
    throw new HTTPError({
      status: 404,
      message: `Icon "${params.iconName}" not found`,
    });
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

  event.res.headers.set('Content-Type', 'image/svg+xml');
  event.res.headers.set('Cache-Control', 'public,max-age=31536000');
  event.res.headers.set('Access-Control-Allow-Origin', '*');

  return svg;
});
