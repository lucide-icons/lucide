import { getAllData } from '../lib/icons'

const getRandomItem = <Item>(items: Item[]): Item => items[Math.floor(Math.random()*items.length)];

export default {
  async load() {
    const icons = await getAllData()

    const randomIcons = Array.from({ length: 55 }, () => getRandomItem(icons))

    return {
      icons: randomIcons,
    }
  }
}
