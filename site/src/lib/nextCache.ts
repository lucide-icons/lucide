import path from 'path';
import fs from 'fs';

const cacheDir = path.join(process.cwd(), '.next/cache');
const nextDir = path.join(process.cwd(), '.next');
const cachePath = (cacheKey: string) => path.join(cacheDir, `${cacheKey}.json`);

type AtomicCacheable = object|string|number|boolean|null;
type Cacheable = AtomicCacheable|AtomicCacheable[];

if (!fs.existsSync(nextDir)) {
  fs.mkdirSync(nextDir)
}

if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir)
}

function read<T extends Cacheable>(cacheKey: string): T {
  if (fs.existsSync(cachePath(cacheKey))) {
    const iconCache = fs.readFileSync(cachePath(cacheKey), "utf8")
    return JSON.parse(iconCache)
  }

  return null
}

function write<T extends Cacheable>(cacheKey: string, content: T): void {


  if (!fs.existsSync(path.join(cacheDir, cacheKey))) {
    fs.mkdirSync(path.join(cacheDir, cacheKey))
  }

  fs.writeFileSync(cachePath(cacheKey), JSON.stringify(content), 'utf-8')
}

function clear(...cacheKeys: string[]) {
  for (const cacheKey of cacheKeys) {
    const itemCachePath = cachePath(cacheKey)
    if (fs.existsSync(itemCachePath)) {
      fs.unlinkSync(itemCachePath)
    }
  }
}

async function resolve<T extends Cacheable>(cacheKey: string, contentResolver: () => Promise<T>|T, writeCache = true): Promise<T> {
  try {
    let cacheItem = await read<T>(cacheKey)
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

const NextCache = {read, write, resolve, clear}

export default NextCache
