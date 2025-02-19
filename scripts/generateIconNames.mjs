import path from 'path';
import { writeFile, getCurrentDirPath, readAllMetadata } from '../tools/build-helpers/helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url);
const ICONS_DIR = path.resolve(currentDir, '../icons');
const icons = await readAllMetadata(ICONS_DIR);

const iconNames = Object.keys(icons).sort();

const output = {
  created_at: new Date().toISOString(),
  icon_names: iconNames,
};

const outputContent = JSON.stringify(output, null, 2);

await writeFile(outputContent, 'icon-names.json', path.resolve(process.cwd()));