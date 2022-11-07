import path from 'path';
import icons from '../icons.json' assert { type: 'json' };
import { writeFile, getCurrentDirPath } from './helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url)

const newCategories = {};
Object.keys(icons.icons).forEach(iconName => {
  icons.icons[iconName].categories.forEach(categoryName => {
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
