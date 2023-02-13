import path from 'path';
import { writeFile, getCurrentDirPath, readAllMetadata } from './helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url);
const ICONS_DIR = path.resolve(currentDir, '../icons');
const icons = readAllMetadata(ICONS_DIR);

const tags = Object.keys(icons)
  .sort()
  .reduce((acc, iconName) => {
    acc[iconName] = icons[iconName].tags;
    return acc;
  }, {});

const tagsContent = JSON.stringify(tags, null, 2);

writeFile(tagsContent, 'tags.json', path.resolve(process.cwd()));
