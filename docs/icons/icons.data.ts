import * as iconDetails from '../.vitepress/data/iconDetails';

export default {
  async load() {
    return {
      icons: Object.entries(iconDetails).map(([, { name, iconNode, popularity, createdRelease }]) => ({
        name,
        iconNode,
        popularity: popularity.count,
        createdRelease,
      })),
    };
  },
};
