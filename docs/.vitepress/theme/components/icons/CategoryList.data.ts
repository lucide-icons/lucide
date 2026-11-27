import { getAllCategoryFiles, mapCategoryIconCount } from '../../../lib/categories.ts';
import iconsMetaData from '../../../data/iconMetaData.ts';

const loader = {
  async load() {
    const categories = mapCategoryIconCount(getAllCategoryFiles(), Object.values(iconsMetaData));

    return {
      categories,
    };
  },
};

declare const data: Awaited<ReturnType<typeof loader.load>>;

export { data };
export default loader;
