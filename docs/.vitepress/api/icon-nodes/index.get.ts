import { eventHandler, getQuery, setResponseHeader } from 'h3';
import iconNodes from '../../data/iconNodes';
import { IconNodeWithKeys } from '../../theme/types';

export default eventHandler((event) => {
  const query = getQuery(event);

  const withUniqueKeys = query.withUniqueKeys === 'true';

  setResponseHeader(event, 'Cache-Control', 'public, max-age=86400');
  setResponseHeader(event, 'Access-Control-Allow-Origin', '*');

  if (withUniqueKeys) {
    return iconNodes;
  }

  return Object.entries(iconNodes).reduce((acc, [name, iconNode]) => {
    if (withUniqueKeys) {
      return [name, iconNode];
    }

    const newIconNode = (iconNode as IconNodeWithKeys).map(([name, { key, ...attrs }]) => {
      return [name, attrs];
    });

    acc[name] = newIconNode;

    return acc;
  }, {});
});
