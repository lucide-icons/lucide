import * as iconDetails from '../.vitepress/data/iconDetails';

export default {
  async load() {
    return {
      icons: Object.entries(iconDetails).map(
        ([, { name, iconNode, popularity, createdRelease, aliases = [] }]) => ({
          name,
          iconNode,
          popularity: popularity.count,
          aliases: aliases?.map((alias) => alias.name),
          createdRelease,
        }),
      ),
    };
  },
};
