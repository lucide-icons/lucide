import Fuse from "fuse.js";
import { getAllData } from "../.vitepress/lib/icons";
import { IconEntity } from "../.vitepress/theme/types";

const getRelatedIcons = (name:string, icons: IconEntity[]) => {
  const index = new Fuse(icons, {
    threshold: 1,
    keys: [
      { name: 'name', weight: 3 },
      { name: 'tags', weight: 2 },
      { name: 'categories', weight: 1 },
    ],
  });

  return index
    .search(name)
    .map((result) => result.item)
    .slice(0, 85)
    .map(({ name, iconNode }: IconEntity) => ({
      name,
      iconNode
    }))

}

export default {
  paths: async () => {
    const icons = await getAllData()

    return icons.map((iconEntity) => {
      const relatedIcons = getRelatedIcons(iconEntity.name, icons)
      const params = {
        ...iconEntity,
        relatedIcons
      }
      return {
        params,
      }
    })
  }
}
