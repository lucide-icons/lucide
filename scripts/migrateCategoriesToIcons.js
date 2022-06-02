import path from 'path';
import icons from '../icons.json';
import categories from '../categories.json';
import { mergeArrays, writeFile } from './helpers';

Object.keys(categories).forEach(categoryName => {
  categories[categoryName].forEach(iconName => {
    mergeArrays(icons.icons[iconName].categories, [categoryName]);
  });
});

const iconsContent = JSON.stringify(icons, null, 2);

writeFile(iconsContent, 'icons.json', path.resolve(__dirname, '..'));
