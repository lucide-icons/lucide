import { IconNodeWithKeys } from '../theme/types';
import iconNodes from '../data/iconNodes';
import iconMetaData from '../data/iconMetaData';
import releaseMeta from '../data/releaseMetaData.json';

const DATE_OF_FORK = '2020-06-08T16:39:52+0100';

export interface GetDataOptions {
  withChildKeys?: boolean;
}

export async function getData(name: string) {
  // Sourced from the generated index so `$extends:` markers are already resolved.
  const { tags, categories, contributors } = iconMetaData[name] ?? {};

  const iconNode = iconNodes[name];

  const releaseData = releaseMeta?.[name] ?? {
    createdRelease: {
      version: '0.0.0',
      date: DATE_OF_FORK,
    },
    changedRelease: {
      version: '0.0.0',
      date: DATE_OF_FORK,
    },
  };

  return {
    name,
    tags,
    categories,
    iconNode,
    contributors,
    ...releaseData,
  };
}

export async function getAllData(): Promise<{ name: string; iconNode: IconNodeWithKeys }[]> {
  const names = Object.keys(iconNodes);

  return Promise.all(names.map((name) => getData(name)));
}
