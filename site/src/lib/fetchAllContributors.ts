import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { Contributor } from '../types';
import fetch, { Headers } from 'node-fetch'

const IGNORE_COMMIT_MESSAGES = ['fork', 'optimize'];

function getContentHashOfFile(path) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(path);
    stream.on('error', err => reject(err));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

const fetchCommitsOfIcon = async (name) =>{
    try {
      const headers = new Headers();
      const token = process.env.GITHUB_TOKEN;
      const username = process.env.GITHUB_USERNAME;
      const password = process.env.GITHUB_API_KEY;
      headers.set(
        'Authorization',
        token ? `Bearer ${token}` : `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
      );

      const res = await fetch(
        `https://api.github.com/repos/lucide-icons/lucide/commits?path=icons/${name}.svg`,
        {
          method: 'GET',
          headers,
        },
      );

      const data = await res.json();

      return {
        name,
        commits: data,
      };
    } catch (error) {

      throw new Error(error);
    }
  };

export const filterCommits = (commits) =>
  commits.filter(({ commit }) =>
    !IGNORE_COMMIT_MESSAGES.some(ignoreItem =>
      commit.message.toLowerCase().includes(ignoreItem),
    ))
  .map(({ author }) => ({
    author: author && author.login ? author.login : null,
  }))
  .filter(({ author }, index, self) => self.findIndex((commit) => commit.author === author) === index);

const getIconHash = async (icon) => await getContentHashOfFile(path.join(process.cwd(), "../icons", `${icon}.svg`))
const iconCacheDir = path.join(process.cwd(),'.next/cache/github-api');
const iconCache = (hash) => path.join(iconCacheDir, `${hash}.json`);

export async function checkIconCache(icon) {
  const hash = await getIconHash(icon);

  const cachePath = iconCache(hash);

  if(fs.existsSync( cachePath )) {
    const iconCache = fs.readFileSync(cachePath, "utf8");

    return JSON.parse(iconCache)
  }

  return false
}

async function writeIconCache(icon, content) {
  const hash = await getIconHash(icon);

  const iconCachePath = iconCache(hash);

  if (!fs.existsSync(iconCacheDir)){
    fs.mkdirSync(iconCacheDir);
}

  fs.writeFileSync(iconCachePath, JSON.stringify(content), 'utf-8');
}

export async function getContributors(icon): Promise<Contributor[]> {
  try {
    let iconCommits
    const iconCache = await checkIconCache(icon);

    if (iconCache) {
      iconCommits = iconCache
    } else {
      const { commits } = await fetchCommitsOfIcon(icon);

      writeIconCache(icon, commits)

      iconCommits = commits
    }

    if (iconCommits && iconCommits.length) {
      return filterCommits(iconCommits);
    }

    return [];
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllContributors(icons) {
  try {
    const AllIconCommits = await Promise.all(icons.map(fetchCommitsOfIcon));

    const filteredCommits = AllIconCommits.reduce((acc, { name, commits }) => {
      if (commits && commits.length) {
        acc[name] = filterCommits(commits)
      }

      return acc;
    }, {});

    return filteredCommits
  } catch (error) {
    console.error(error);
  }
}
