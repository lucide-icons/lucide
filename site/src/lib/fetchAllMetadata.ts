import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import {Release} from '../types';
import GithubApi from "./githubApi";
import NextCache from "./nextCache";

const IGNORE_COMMIT_MESSAGES = ['fork', 'optimize'];

function getContentHashOfFile(path) {
  return new Promise<string>((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(path);
    stream.on('error', err => reject(err));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

export const fetchCommitsOfIcon = async (name) => {
  try {
    return await GithubApi.getAll('/commits', {path: `icons/${name}.svg`});
  } catch (error) {
    throw new Error(error);
  }
};

export const filterCommits = (commits) =>
  commits.filter(({commit}) =>
    !IGNORE_COMMIT_MESSAGES.some(ignoreItem =>
      commit.message.toLowerCase().includes(ignoreItem),
    ))
    .map(({author}) => ({
      author: author && author.login ? author.login : null,
    }))
    .filter(({author}, index, self) => self.findIndex((commit) => commit.author === author) === index);

const getIconHash = async (icon) => await getContentHashOfFile(path.join(process.cwd(), "../icons", `${icon}.svg`))

const findRelease = (date, releases: Release[]) => {
  let closestRelease = null;
  let closestReleaseDate = null;
  for (const release of releases) {
    if (release.published >= date && (closestReleaseDate === null || release.published < closestReleaseDate)) {
      closestRelease = release;
      closestReleaseDate = release.published;
    }
  }
  return closestRelease;
}

export async function getMetadata(name, releases: Release[]) {
  try {
    const cacheKey = `github-api/${await getIconHash(name)}`;
    return await NextCache.resolve(cacheKey, async () => {
      const commits = await fetchCommitsOfIcon(name);

      let created = null;
      let changed = null;
      let createdRelease;
      let changedRelease;
      if (commits && commits.length) {
        for (const commit of commits) {
          const date = new Date(commit.commit.author.date).valueOf();
          created = created === null || created > date ? date : created;
          changed = changed === null || changed < date ? date : changed;
        }
        createdRelease = findRelease(created, releases);
        changedRelease = findRelease(changed, releases);
      }
      return {
        name,
        commits,
        createdRelease,
        changedRelease,
        created: createdRelease ? createdRelease.published : created,
        changed: changedRelease ? changedRelease.published : changed,
        contributors: commits ? await filterCommits(commits) : [],
      };
    });
  } catch (error) {
    throw new Error(error);
  }
}

export const fetchNumberOfContributors = async () => {
  try {
    return NextCache.resolve(`contributors`, async () => {
      const response = await GithubApi.get('/contributors', {per_page: 1});
      return parseInt(response.headers.get('link').match(/page=([0-9]+)>; rel="last"/)[1], 10);
    });
  } catch (error) {
    throw new Error(error);
  }
}
