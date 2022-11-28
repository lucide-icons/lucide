import path from 'path';
import fs from 'fs';

const cacheDir = path.join(process.cwd(), '.next/cache/github-api');
const cachePath = (cacheKey) => path.join(cacheDir, `${cacheKey}.json`);

const read = (cacheKey) => {
  if (fs.existsSync(cachePath(cacheKey))) {
    const iconCache = fs.readFileSync(cachePath(cacheKey), "utf8");

    return JSON.parse(iconCache)
  }

  return null
}

const write = (cacheKey, content) => {
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir);
  }

  fs.writeFileSync(cachePath(cacheKey), JSON.stringify(content), 'utf-8');
}

const resolve = async (cacheKey, contentResolver) => {
  try {
    let cacheItem = await read(cacheKey);
    if (cacheItem === null) {
      cacheItem = await contentResolver();
      write(cacheKey, cacheItem);
    }
    return cacheItem;
  } catch (error) {
    throw new Error(error);
  }
}

const GithubCache = {read, write, resolve};

export default GithubCache;
