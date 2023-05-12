import Fuse from "fuse.js";
import { getAllData } from "../.vitepress/lib/icons";
import { IconEntity } from "../.vitepress/theme/types";

// TODO: This should be ordered by relevance
const getRelatedIcons = (currentIcon:IconEntity, icons: IconEntity[]) => {
  return icons.filter((icon) => {
    const { name: iconName, tags, categories } = icon;
    const isNameRelated = iconName.includes(currentIcon.name);

    const hasRelatedTags = tags?.some((tag) => currentIcon?.tags?.includes(tag));
    const hasRelatedCategories = categories?.some((category) =>
      currentIcon?.categories?.includes(category)
    );

    return isNameRelated || hasRelatedTags || hasRelatedCategories;
  });
}

export default {
  paths: async () => {
    const icons = await getAllData()

    return icons.map((iconEntity) => {
      const relatedIcons = getRelatedIcons(iconEntity, icons)
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
