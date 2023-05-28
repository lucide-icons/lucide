import { getAllData } from "../.vitepress/lib/icons";
import relatedIcons from '../.vitepress/data/relatedIcons.json'

export default {
  paths: async () => {
    const icons = await getAllData()
    const iconMap = icons.reduce((acc, icon) => {
      acc[icon.name] = icon
      return acc
    }, {})

    return icons.map((iconEntity) => {

      const params = {
        ...iconEntity,
        relatedIcons: relatedIcons[iconEntity.name].map((name: string) => ({
          name,
          iconNode: iconMap[name].iconNode,
        })),
      }
      return {
        params,
      }
    })
  }
}
