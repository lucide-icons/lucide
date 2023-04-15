import NextCache from './nextCache';
import {getAllData, GetDataOptions} from './icons';

export type IconNode = [string, object, IconNode[]];
export type IconNodes = {[iconName: string]: IconNode};

export function fetchIconNodes(writeCache = true, options?: GetDataOptions): Promise<IconNodes> {
  if (options?.withChildKeys) {
    return NextCache.resolve('api-icon-nodes-with-keys', async () => {
      return (await getAllData({ withChildKeys : true})).reduce((acc, icon) => {
        acc[icon.name] = icon.iconNode
        return acc;
      }, {});
    }, writeCache);
  }

  return NextCache.resolve('api-icon-nodes', async () => {
    return (await getAllData()).reduce((acc, icon) => {
      acc[icon.name] = icon.iconNode
      return acc;
    }, {});
  }, writeCache);
}
