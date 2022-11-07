import path from 'path';
import icons from '../icons.json' assert { type: 'json' };
import categories from '../categories.json' assert { type: 'json' };
import { mergeArrays, writeFile, getCurrentDirPath } from './helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url)

Object.keys(categories).forEach(categoryName => {
  categories[categoryName].forEach(iconName => {
    mergeArrays(icons.icons[iconName].categories, [categoryName]);
  });
});

const iconsContent = JSON.stringify(icons, null, 2);

writeFile(iconsContent, 'icons.json', path.resolve(currentDir, '..'));
