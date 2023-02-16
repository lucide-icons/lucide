import path from 'path';
import categories from '../categories.json' assert { type: 'json' };
import { mergeArrays, writeFile, readAllMetadata, getCurrentDirPath } from './helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url)
const ICONS_DIR = path.resolve(currentDir, '../icons');
const icons = readAllMetadata(ICONS_DIR);

Object.keys(categories).forEach(categoryName => {
  categories[categoryName].forEach(iconName => {
    icons[iconName].categories = mergeArrays(icons[iconName].categories, [categoryName]);
  });
});

Object.keys(icons).forEach(iconName => {
  const iconContent = JSON.stringify(icons[iconName], null, 2);
  writeFile(iconContent, `${iconName}.json`, path.resolve(currentDir, '../icons'));
})

