import { getAllData } from '../.vitepress/lib/icons'
import { getAllCategoryFiles } from '../.vitepress/lib/categories'
import { IconEntity } from '../.vitepress/theme/types'

export default {
  async load() {
    const icons = await getAllData()

    return {
      categories: getAllCategoryFiles(),
      icons,
    }
  }
}
