import { IconEntity } from '../../.vitepress/theme/types';

export default {
  paths: async () => {
    const iconDetailsResponse = await fetch('https://lab.lucide.dev/api/icon-details');
    const iconDetails = (await iconDetailsResponse.json()) as Record<string, IconEntity>;

    return Object.values(iconDetails).map((iconEntity) => {
      const params = {
        externalLibrary: 'lab',
        ...iconEntity,
      };

      return {
        params,
      };
    });
  },
};
