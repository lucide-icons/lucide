import { eventHandler, setResponseHeader } from 'h3';
import iconNodes from '../../data/iconNodes';
import { IconNodeWithKeys } from '../../theme/types.ts';
import iconMetaData from '../../data/iconMetaData.ts';
import releaseMeta from '../../data/releaseMetaData.json';
import { getAllCategoryFiles } from '../../lib/categories.ts';

const dataResponse = {
  icons: Object.entries(iconNodes).reduce((acc, [name, iconNode]) => {
    const newIconNode = (iconNode as IconNodeWithKeys).map(([name, { key, ...attrs }]) => {
      return [name, attrs];
    });

    acc[name] = {
      iconNode: newIconNode,
      aliases: (iconMetaData[name]?.aliases ?? []).map((alias) =>
        typeof alias === 'string' ? alias : alias.name,
      ),
      tags: iconMetaData[name].tags ?? [],
      categories: iconMetaData[name].categories ?? [],
      ...releaseMeta[name],
    };

    return acc;
  }, {}),
  aliases: Object.entries(iconNodes).reduce((acc, [name]) => {
    for (const alias of iconMetaData[name]?.aliases ?? []) {
      acc[typeof alias === 'string' ? alias : alias.name] = name;
    }

    return acc;
  }, {}),
  categories: getAllCategoryFiles(),
};

export default eventHandler((event) => {
  setResponseHeader(event, 'Cache-Control', 'public, max-age=86400');
  setResponseHeader(event, 'Access-Control-Allow-Origin', '*');

  return dataResponse;
});
