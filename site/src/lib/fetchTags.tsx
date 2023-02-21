import NextCache from './nextCache';
import {getAllData} from './icons';

export type Tags = {[iconName: string]: string[]};

export function fetchTags(writeCache = true): Promise<Tags> {
  return NextCache.resolve('api-tags', async () => {
    return (await getAllData()).reduce((acc, icon) => {
      acc[icon.name] = icon.tags;
      return acc;
    }, {});
  }, writeCache);
}
