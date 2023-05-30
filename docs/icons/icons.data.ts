import { getAllData } from '../.vitepress/lib/icons'

export default {
  async load() {
    return {
      icons: await getAllData(),
    }
  }
}
