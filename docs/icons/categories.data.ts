import { getAllCategoryFiles } from '../.vitepress/lib/categories';
import iconMetaData from '../.vitepress/data/iconMetaData';

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
