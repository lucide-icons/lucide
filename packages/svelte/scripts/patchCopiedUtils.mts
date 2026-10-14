import { readFile, writeFile } from 'node:fs/promises';

const filePath = new URL('../src/utils/buildLucideIconNode.ts', import.meta.url);

const source = await readFile(filePath, 'utf8');

const patched = source
  .replace("from './types';", "from './types.js';")
  .replace("from './defaultAttributes';", "from './defaultAttributes.js';")
  .replace("from '../utils/mergeClasses';", "from '../utils/mergeClasses.js';");

if (patched !== source) {
  await writeFile(filePath, patched);
}
