import path from 'path';
import { writeFile, getCurrentDirPath, readAllMetadata } from './helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url)
const ICONS_DIR = path.resolve(currentDir, '../icons');
const icons = readAllMetadata(ICONS_DIR);

const newCategories = {};
Object.keys(icons).forEach(iconName => {
  icons[iconName].categories.forEach(categoryName => {
    newCategories[categoryName] = newCategories[categoryName] || [];
    newCategories[categoryName].push(iconName);
  });
});

const ordered = Object.keys(newCategories).sort().reduce(
  (obj, key) => {
    obj[key] = newCategories[key];
    return obj;
  },
  {}
);

const categoriesContent = JSON.stringify(ordered, null, 2);

writeFile(categoriesContent, 'categories.json', path.resolve(currentDir, '..'));
