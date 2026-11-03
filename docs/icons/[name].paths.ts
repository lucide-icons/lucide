import relatedIcons from '../.vitepress/data/relatedIcons.json';
import iconNodes from '../.vitepress/data/iconNodes';
import * as iconDetails from '../.vitepress/data/iconDetails';
import { IconEntity } from '../.vitepress/theme/types';

/**
 * The generated `iconDetails` modules import `iconPopularity/<name>.json` as-is,
 * so popularity arrives as the raw `{ count }` object instead of a number.
 */
type IconDetail = Omit<IconEntity, 'popularity'> & { popularity?: { count: number } };

export default {
  paths: async () => {
    return (Object.values(iconDetails) as unknown as IconDetail[]).map((iconEntity) => {
      const params = {
        ...iconEntity,
        popularity: iconEntity.popularity?.count ?? 0,
        relatedIcons: relatedIcons[iconEntity.name].map((name: string) => ({
          name,
          iconNode: iconNodes[name],
        })),
      };

      return {
        params,
      };
    });
  },
};
