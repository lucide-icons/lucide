import relatedIcons from '../.vitepress/data/relatedIcons.json';
import iconNodes from '../.vitepress/data/iconNodes';
import * as iconDetails from '../.vitepress/data/iconDetails';
import { IconEntity } from '../.vitepress/theme/types';

export default {
  paths: async () => {
    return (Object.values(iconDetails) as unknown as IconEntity[]).map((iconEntity) => {
      const params = {
        ...iconEntity,
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
