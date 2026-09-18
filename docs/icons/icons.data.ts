import * as iconDetails from '../.vitepress/data/iconDetails';

export default {
  async load() {
    return {
      icons: Object.entries(iconDetails)
        .map(
          ([
            ,
            { name, iconNode, popularity, createdRelease, awaitingRelease, aliases = [], fromFork },
          ]) => ({
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
          // We hide icons that are not released yet, we make exceptions for preview environments
        )
        .filter(
          ({ awaitingRelease }) => !awaitingRelease || process.env.VITE_SHOW_AWAITING_RELEASE,
        ),
    };
  },
};
