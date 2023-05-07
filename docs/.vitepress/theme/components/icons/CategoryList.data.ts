import { getAllData } from '../../../lib/icons';
import { getAllCategoryFiles, mapCategoryIconCount } from '../../../lib/categories';


export default {
  async load() {
    const icons = await getAllData()
    let categories = getAllCategoryFiles()

    categories = mapCategoryIconCount(categories, icons)

    return {
      categories,
    }
  }
}
