import { lstatSync } from 'fs';
import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { getCurrentDirPath } from '../../../scripts/helpers.mjs';
import { getJSBanner } from './license.mjs';

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

  if (license) {
    newContents = license + contents;
  }

  // Places icon block comment at the top of the Svelte component class
  if (/icons\/(.*?)\.svelte\.d\.ts/.test(filepath)) {
    const svelteFilepath = filepath.replace('.d.ts', '');
    let svelteFileContents = await readFile(svelteFilepath, { encoding: 'utf-8' });

    const blockCommentRegex = /\/\*\*\n\s\*\s(@component\s@name)[\s\S]*?\*\//;
    const blockCommentMatch = blockCommentRegex.exec(svelteFileContents);

    if (blockCommentMatch !== null) {
      const blockComment = blockCommentMatch[0];

      const exportClassRegex = /export default class (\w+) extends SvelteComponentTyped<(.*?)> {/;

      if (exportClassRegex.test(newContents)) {
        newContents = newContents.replace(
          exportClassRegex,
          `${blockComment}\nexport default class $1 extends SvelteComponentTyped<$2> {`,
        );
      }
    }
  }

  if (newContents !== contents) {
    await writeFile(filepath, newContents, { encoding: 'utf-8' });
  }
}
