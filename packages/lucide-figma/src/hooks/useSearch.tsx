import { useMemo } from "react";
import { IconName, IconNode, Tags } from "../api/fetchIcons";
import filterIcons from "../helpers/filterIcons";

export type Icon = [
  name: IconName,
  iconNode: IconNode
]

function useSearch(icons: Icon[], tags: Tags ,query:string) {
  if(!query) return icons;

  const searchString = query.toLowerCase()

  return useMemo(() => filterIcons(icons, tags, searchString), [icons, tags, query]);
}

export default useSearch;
