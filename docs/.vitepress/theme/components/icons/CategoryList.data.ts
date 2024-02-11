import { getAllData } from '../../../lib/icons';
import { getAllCategoryFiles, mapCategoryIconCount } from '../../../lib/categories';
import iconsMetaData from '../../../data/iconMetaData';

export default {
  async load() {
    let categories = getAllCategoryFiles();

    categories = mapCategoryIconCount(categories, Object.values(iconsMetaData));

    return {
      categories,
    };
  },
};
