import iconNodes from '../.vitepress/data/iconNodes';

export default {
  async load() {
    return {
      icons: Object.entries(iconNodes).map(([name, iconNode]) => ({ name, iconNode })),
    };
  },
};
