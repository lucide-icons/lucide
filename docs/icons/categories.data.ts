import { getAllCategoryFiles } from '../.vitepress/lib/categories.ts';
import iconMetaData from '../.vitepress/data/iconMetaData.ts';

export default {
  async load() {
    return {
      categories: getAllCategoryFiles(),
      iconCategories: Object.fromEntries(
        Object.entries(iconMetaData).map(([name, { categories }]) => [name, categories]),
      ),
    };
  },
};
