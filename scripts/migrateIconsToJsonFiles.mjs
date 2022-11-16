import path from 'path';
import icons from '../icons.json' assert { type: 'json' };
import { writeFile, getCurrentDirPath } from './helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url)

Object.keys(icons.icons).forEach(iconName => {
  const icon = {
    "$schema": "../icon.schema.json",
    ...icons.icons[iconName]
  };
  const iconContent = JSON.stringify(icon, null, 2);
  writeFile(iconContent, 'icons/'+iconName+'.json', path.resolve(currentDir, '..'));
});

Object.keys(icons.categories).forEach(categoryName => {
  const category = {
    "$schema": "../category.schema.json",
    ...icons.categories[categoryName]
  };
  const categoryContent = JSON.stringify(category, null, 2);
  writeFile(categoryContent, 'categories/'+categoryName+'.json', path.resolve(currentDir, '..'));
});
