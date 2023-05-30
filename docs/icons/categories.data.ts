import { getAllCategoryFiles } from '../.vitepress/lib/categories'
import * as iconDetails from '../.vitepress/data/iconDetails'

export default {
  async load() {
    return {
      categories: getAllCategoryFiles(),
      iconCategories: Object.fromEntries(
        Object.values(iconDetails).map(({ name, categories }) => [name, categories])
      ),
    }
  }
}
