import { getCurrentDirPath } from '../../../scripts/helpers.mjs';
import { lstatSync } from 'fs';
import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import pkg from '../package.json' assert { type: 'json' };

const BANNER = `@license ${pkg.name} v${pkg.version} - ${pkg.license}

This source code is licensed under the ${pkg.license} license.
See the LICENSE file in the root directory of this source tree.`;

const currentDir = getCurrentDirPath(import.meta.url);
const targetDirectory = path.join(currentDir, '../dist');

const files = await readdir(targetDirectory, {
  recursive: true,
  encoding: 'utf-8',
});

for (const file of files) {
  const filepath = path.join(targetDirectory, file);
  const filestat = lstatSync(filepath);

  if (filestat.isFile() === false || filestat.isDirectory()) continue;

  const contents = await readFile(filepath, { encoding: 'utf-8' });
  const ext = path.extname(filepath);
  let license;

  if (/\.(js|mjs|cjs|ts)/.test(ext)) {
    license = getJSBanner();
  }

  if (/\.svelte/.test(ext)) {
    license = getSvelteBanner();
  }

  if (license) {
    await writeFile(filepath, license + contents, { encoding: 'utf-8' });
  }
}

function getJSBanner() {
  return `/**
 * ${BANNER}
 */
\n`;
}

function getSvelteBanner() {
  return `<!-- 
  ${BANNER} 
-->
\n`;
}
