import {IconEntity} from "../types";

const categoryWeight = 5;
const tagWeight = 3;

const arrayMatches = (a: string[], b: string[]) => {
  let matches = 0;
  for (let i = 0; i < a.length; ++i) {
    if (b.indexOf(a[i]) != -1) {
      matches++;
    }
  }
  return matches;
}

export function findSimilarIcons(icons: IconEntity[], base: IconEntity, limit = 18): IconEntity[] {
  const iconSimilarity = (item: IconEntity) =>
    categoryWeight * arrayMatches(item.categories, base.categories)
    + tagWeight * arrayMatches(item.tags, base.tags)
  ;
  return icons
    .filter(i => i.name !== base.name)
    .map(icon => ({icon, similarity: iconSimilarity(icon)}))
    .filter(a => a.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
    .map(i => i.icon)
    .sort((a, b) => (
      a.name<b.name ? -1 : 1
    ))
    ;
}
