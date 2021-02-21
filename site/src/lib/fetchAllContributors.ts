import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const IGNORE_COMMIT_MESSAGES = ['fork', 'optimize'];

function getContentHashOfFile(path) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('md4');
    const stream = fs.createReadStream(path);
    stream.on('error', err => reject(err));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

const fetchCommitsOfIcon = (name) =>
  new Promise(async (resolve, reject) => {
    try {
      const headers = new Headers();
      const username = 'ericfennis';
      const password = process.env.GITHUB_API_KEY;
      headers.set(
        'Authorization',
        `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
      );

      const res = await fetch(
        `https://api.github.com/repos/lucide-icons/lucide/commits?path=icons/${name}.svg`,
        {
          method: 'GET',
          headers,
        },
      );

      const data = await res.json();

      resolve({
        name,
        commits: data,
      });
    } catch (error) {

      reject(error);
    }
  });

export const filterCommits = (commits) =>
  commits.filter(({ commit }) =>
    !IGNORE_COMMIT_MESSAGES.some(ignoreItem =>
      commit.message.toLowerCase().includes(ignoreItem),
    ))
  .map(({ sha, author, commit }) => ({
    author: author && author.login ? author.login : null,
    commit: sha,
  }));

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

export async function getContributors(icon) {
  try {
    let iconCommits
    const iconCache = await checkIconCache(icon);

    if (iconCache) {
      iconCommits = iconCache
    } else {
      const { commits } : any = await fetchCommitsOfIcon(icon);

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
