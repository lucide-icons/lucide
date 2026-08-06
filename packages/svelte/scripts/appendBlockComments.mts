import { lstatSync } from 'fs';
import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { getCurrentDirPath } from '@lucide/helpers';
import { getJSBanner } from './license.mts';

const currentDir = getCurrentDirPath(import.meta.url);
const targetDirectory = path.join(currentDir, '../dist');

const jsBanner = getJSBanner();

const files = await readdir(targetDirectory, {
  recursive: true,
  encoding: 'utf-8',
});

 
for (const file of files) {
  const filepath = path.join(targetDirectory, file);
  const filestat = lstatSync(filepath);

   
  if (filestat.isFile() === false || filestat.isDirectory()) continue;

   
  const contents = (await readFile(filepath, { encoding: 'utf-8' })) as unknown as string;
  const ext = path.extname(filepath);

  if (/\.(js|mjs|cjs|ts)/.test(ext)) {
     
    await writeFile(filepath, jsBanner + contents, { encoding: 'utf-8' });
  }
}
