import { getAllCategoryFiles, mapCategoryIconCount } from '../../../lib/categories';
import iconsMetaData from '../../../data/iconMetaData';

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
