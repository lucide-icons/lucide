import Fuse from "fuse.js";
import { getAllData } from "../.vitepress/lib/icons";
import { IconEntity } from "../.vitepress/theme/types";

const nameWeight = 5;
const tagWeight = 4;
const categoryWeight = 3;

const arrayMatches = (a: string[], b: string[]) => {
  let matches = 0;
  for (let i = 0; i < a.length; ++i) {
    if (b.indexOf(a[i]) != -1) {
      matches++;
    }
  }
  return matches;
}

const nameParts = (icon: IconEntity) => [icon.name, ...icon.aliases ?? []]
    .join('-')
    .split('-')
    .filter(word => word.length > 2)

const getRelatedIcons = (currentIcon: IconEntity, icons: IconEntity[]) => {
  const iconSimilarity = (item: IconEntity) =>
    nameWeight * arrayMatches(nameParts(item), nameParts(currentIcon))
    + categoryWeight * arrayMatches(item.categories, currentIcon.categories)
    + tagWeight * arrayMatches(item.tags, currentIcon.tags)
  ;
  return icons
    .filter(i => i.name !== currentIcon.name)
    .map(icon => ({icon, similarity: iconSimilarity(icon)}))
    .filter(a => a.similarity > 0) // @todo: maybe require a minimal non-zero similarity
    .sort((a, b) => b.similarity - a.similarity)
    .map(i => i.icon)
    ;
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
