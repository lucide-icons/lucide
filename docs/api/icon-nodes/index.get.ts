import { defineHandler, getQuery } from 'nitro/h3';
import iconNodes from '~/.vitepress/data/iconNodes';

export default defineHandler((event) => {
  const query = getQuery(event);

  const withUniqueKeys = query.withUniqueKeys === 'true';

  event.res.headers.set('Cache-Control', 'public, max-age=86400');
  event.res.headers.set('Access-Control-Allow-Origin', '*');

  if (withUniqueKeys) {
    return iconNodes;
  }

  return Object.entries(iconNodes).reduce((acc, [name, iconNode]) => {
    if (withUniqueKeys) {
      return [name, iconNode];
    }

    const newIconNode = iconNode.map(([name, { key, ...attrs }]) => {
      return [name, attrs];
    });

    acc[name] = newIconNode;

    return acc;
  }, {});
});
