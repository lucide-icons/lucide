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
  let newContents = contents;
  const ext = path.extname(filepath);
  let license;

  if (/\.(js|mjs|cjs|ts)/.test(ext)) {
    license = getJSBanner();
  }

  if (/\.svelte/.test(ext)) {
    license = getSvelteBanner();
  }

  if (license) {
    newContents = license + contents;

  }

  // Places icon block comment at the top of the Svelte component class
  if(/icons\/(.*?)\.svelte\.d\.ts/.test(filepath)) {
    const svelteFilepath = filepath.replace('.d.ts', '')
    let svelteFileContents = await readFile(svelteFilepath, { encoding: 'utf-8' });

    const blockCommentRegex = /\/\*\*[\s\S]*?\*\//;
    const blockCommentMatch = blockCommentRegex.exec(svelteFileContents);

    if (blockCommentMatch !== null) {
      const blockComment = blockCommentMatch[0];

      const exportClassRegex = /export default class (\w+) extends SvelteComponentTyped<(.*?)> {/;

      if (exportClassRegex.test(newContents)) {
        newContents = newContents.replace(exportClassRegex, `${blockComment}\nexport default class $1 extends SvelteComponentTyped<$2> {`);
      }
    }
  }

  if(newContents !== contents) {
    await writeFile(filepath, newContents, { encoding: 'utf-8' });
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
