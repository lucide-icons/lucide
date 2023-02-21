import NextCache from './nextCache';
import {parseSync} from 'svgson';
import {getAllData} from './icons';

export type IconNode = [string, object, IconNode[]];
export type IconNodes = {[iconName: string]: IconNode};

export function fetchIconNodes(writeCache = true): Promise<IconNodes> {
  return NextCache.resolve('api-icon-nodes', async () => {
    return (await getAllData()).reduce((acc, icon) => {
      acc[icon.name] = icon.iconNode
      return acc;
    }, {});
  }, writeCache);
}
