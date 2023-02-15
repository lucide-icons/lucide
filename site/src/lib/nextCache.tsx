import path from 'path';
import fs from 'fs';

const cacheDir = path.join(process.cwd(), '.next/cache');
const cachePath = (cacheKey: string) => path.join(cacheDir, `${cacheKey}.json`);

type AtomicCacheable = object|string|number|boolean|null;
type Cacheable = AtomicCacheable|AtomicCacheable[];

const read: <T extends Cacheable>(cacheKey: string) => T = (cacheKey: string) => {
  if (fs.existsSync(cachePath(cacheKey))) {
    const iconCache = fs.readFileSync(cachePath(cacheKey), "utf8")
    return JSON.parse(iconCache)
  }

  return null
}

const write = <T extends Cacheable>(cacheKey: string, content: T) => {
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir)
  }

  fs.writeFileSync(cachePath(cacheKey), JSON.stringify(content), 'utf-8')
}

const resolve: <T extends Cacheable>(cacheKey: string, contentResolver: () => Promise<T>|T) => Promise<T> = async <T extends Cacheable>(cacheKey: string, contentResolver: () => Promise<T>|T, writeCache: boolean = true) => {
  try {
    let cacheItem: T = await read(cacheKey)
    if (cacheItem === null) {
      cacheItem = await contentResolver()
      if (writeCache) {
        write(cacheKey, cacheItem)
      }
    }
    return cacheItem;
  } catch (error) {
    throw new Error(error)
  }
}

const NextCache = {read, write, resolve}

export default NextCache
