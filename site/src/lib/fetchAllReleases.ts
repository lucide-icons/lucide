import GithubApi from "./githubApi";
import GithubCache from "./githubCache";

export const fetchLatestRelease = async () => {
  try {
    const res = await GithubApi.get('/releases/latest');
    const data = await res.json();

    return data.tag_name;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllReleases = async () => {
  try {
    const latestRelease = await fetchLatestRelease();
    const releases = await GithubCache.resolve(`releases-${latestRelease}`, async () => await fetchAllReleases(latestRelease));
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

const fetchAllReleases = async (latestRelease) => {
  try {
    return await GithubApi.getAll('/releases', {per_page: 100});
  } catch (error) {
    throw new Error(error);
  }
};
