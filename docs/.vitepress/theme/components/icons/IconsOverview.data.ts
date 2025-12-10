import { getAllData } from '../../../lib/icons';
import { getAllCategoryFiles, mapCategoryIconCount } from '../../../lib/categories';
import iconsMetaData from '../../../data/iconMetaData';
import { fetchAllReleases } from '../../../../scripts/writeReleaseMetadata.mts';
import { satisfies } from 'semver';

export default {
  async load() {
    const versions = await fetchAllReleases();

    const mappedVersions = versions
      .map((tag) => tag.replace('v', ''))
      .reverse()

    mappedVersions.length = 100

    return {
      versions: mappedVersions,
    };
  },
};
