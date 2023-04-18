import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import GithubApi from './githubApi';
import NextCache from './nextCache';
import * as iconReleaseCache from '../../../icon-releases.json';

const iconCacheVersion = '20230415';

function getContentHashOfFile(path) {
  return new Promise<string>((resolve, reject) => {
    const hash = crypto.createHmac('sha256', iconCacheVersion);
    const stream = fs.createReadStream(path);
    stream.on('error', err => reject(err));
    stream.on('data', chunk => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
  });
}

const getIconHash = async (icon) => await getContentHashOfFile(path.join(process.cwd(), "../icons", `${icon}.svg`))

export async function getMetadata(name) {
  if (name in iconReleaseCache) {
    return iconReleaseCache[name];
  }
  console.error(`No cached metadata metadata for icon "${name}"`);
  return {
    createdRelease: null,
    changedRelease: null,
    created: null,
    changed: null,
    contributors: [],
  };
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
