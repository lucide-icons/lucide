
import { IconEntity } from '../../.vitepress/theme/types';

export default {
  paths: async () => {
    const iconDetailsResponse = await fetch('http://localhost:3000/api/icon-details')
    const iconDetails = await iconDetailsResponse.json() as Record<string, IconEntity>

    return Object.values(iconDetails)
  },
};
