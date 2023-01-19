import GithubApi from "./githubApi";
import GithubCache from "./githubCache";
import * as lucidePackage from '../../../packages/lucide/package.json' assert {type: 'json'};

export const fetchCurrentRelease = async () => {
  return `v${lucidePackage.version}`;
};

export const getAllReleases = async () => {
  try {
    const currentVersion = await fetchCurrentRelease();
    const releases = await GithubCache.resolve(`releases-${currentVersion}`, async () => await fetchAllReleases(currentVersion));
    return releases.map(
      (data) => {
        return {
          name: data.tag_name,
          published: new Date(data.published_at).valueOf(),
          url: data.url,
        }
      }
    );
  } catch (error) {
    throw new Error(error);
  }
}

const fetchAllReleases = async () => {
  try {
    return await GithubApi.getAll('/releases', {per_page: 100});
  } catch (error) {
    throw new Error(error);
  }
};
