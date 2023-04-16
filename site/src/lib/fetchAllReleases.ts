import GithubApi from "./githubApi";
import * as lucidePackage from '../../../packages/lucide/package.json'
import NextCache from "./nextCache";

export const fetchCurrentRelease = async () => {
  return `v${lucidePackage.version}`;
};

export const getAllReleases = async () => {
  try {
    const releases = await NextCache.resolve(`releases`, async () => await fetchAllReleases());
    return releases.map((data) => ({
      name: data.tag_name,
      published: new Date(data.published_at).valueOf(),
      url: data.url,
    }));
  } catch (error) {
    console.error('Could not fetch releases.', error);
    return [];
  }
}

export const fetchAllReleases = async () => {
  try {
    return await GithubApi.getAll('/releases', {per_page: 100});
  } catch (error) {
    throw new Error(error);
  }
};
