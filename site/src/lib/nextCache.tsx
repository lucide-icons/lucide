import path from 'path';
import fs from 'fs';

const cacheDir = path.join(process.cwd(), '.next/cache');
const cachePath = (cacheKey: string) => path.join(cacheDir, `${cacheKey}.json`);

const read = (cacheKey: string) => {
  if (fs.existsSync(cachePath(cacheKey))) {
    const iconCache = fs.readFileSync(cachePath(cacheKey), "utf8")
    return JSON.parse(iconCache)
  }

  return null
}

const write = (cacheKey: string, content: any) => {
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir)
  }

  fs.writeFileSync(cachePath(cacheKey), JSON.stringify(content), 'utf-8')
}

const resolve = async (cacheKey: string, contentResolver: () => Promise<any>|any) => {
  try {
    let cacheItem = await read(cacheKey)
    if (cacheItem === null) {
      cacheItem = await contentResolver()
      write(cacheKey, cacheItem)
    }
    return cacheItem;
  } catch (error) {
    throw new Error(error)
  }
}

const NextCache = {read, write, resolve}

export default NextCache
