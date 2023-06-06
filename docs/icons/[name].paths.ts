import { getAllData } from "../.vitepress/lib/icons";
import relatedIcons from '../.vitepress/data/relatedIcons.json'
import iconNodes from '../.vitepress/data/iconNodes'

export default {
  paths: async () => {
    const icons = await getAllData()
    return icons.map((iconEntity) => {

      const params = {
        ...iconEntity,
        relatedIcons: relatedIcons[iconEntity.name].map((name: string) => ({
          name,
          iconNode: iconNodes[name],
        })),
      }

      return {
        params,
      }
    })
  }
}
