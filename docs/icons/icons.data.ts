import { type IconMetaData } from '~/.vitepress/theme/types';
import * as iconDetails from '../.vitepress/data/iconDetails';

export default {
  async load() {
    return {
      icons: Object.entries(iconDetails).map(
        ([, { name, iconNode, popularity, createdRelease, awaitingRelease, aliases = [], fromFork }]) => ({
          name,
          iconNode,
          popularity: popularity?.count ?? 0,
          aliases: aliases
            .map((alias) => (typeof alias === 'string' ? alias : alias?.name))
            .filter((alias): alias is string => Boolean(alias)),
          createdRelease,
          awaitingRelease,
          fromFork,
        }),
      ),
    };
  },
};
