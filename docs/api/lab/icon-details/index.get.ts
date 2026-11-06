import { defineHandler } from 'nitro/h3';
import iconMetaData from '~/.vitepress/data/lab/iconMetaData';
import iconPopularity from '~/.vitepress/data/lab/iconPopularity';
import iconNodes from '~/.vitepress/data/lab/iconNodes';

export default defineHandler((event) => {
  event.res.headers.set('Access-Control-Allow-Origin', '*');

  return Object.fromEntries(
    Object.entries(iconMetaData).map(([iconName, iconData]) => {
      // Remove $schema from the response
      delete iconData['$schema'];

      return [
        iconName,
        {
          name: iconName,
          iconNode: iconNodes[iconName],
          popularity: iconPopularity[iconName]?.count ?? 0,
          ...iconData,
        },
      ];
    }),
  );
});
