import iconNodes from '../../.vitepress/data/lab/iconNodes';
import iconPopularity from '../../.vitepress/data/lab/iconPopularity';
import iconMetaData from '../../.vitepress/data/lab/iconMetaData';
import { type IconEntity } from '../../.vitepress/theme/types';

export default {
  paths: async () => {
    return (Object.entries(iconNodes) as unknown as IconEntity[]).map(([name, iconNode]) => {
      const iconDetails = iconMetaData[name];

      delete iconDetails['$schema'];

      const params = {
        name,
        iconNode,
        externalLibrary: 'lab',
        popularity: iconPopularity[name]?.count ?? 0,
        ...iconDetails,
      };

      return {
        params,
      };
    });
  },
};
