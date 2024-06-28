import { IconName, IconNode, Tags } from '../api/fetchIcons';
import filterIcons from '../helpers/filterIcons';

export type Icon = [name: IconName, iconNode: IconNode];

function useSearch(icons: Icon[], tags: Tags, query: string) {
  if (!query) return icons;

  const searchString = query.toLowerCase();

  return filterIcons(icons, tags, searchString);
}

export default useSearch;
