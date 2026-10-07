import iconNodes from '../../.vitepress/data/lab/iconNodes';

export default {
  paths: async () => {
    return Object.keys(iconNodes).map((name) => ({
      params: {
        name,
      },
    }));
  },
};
