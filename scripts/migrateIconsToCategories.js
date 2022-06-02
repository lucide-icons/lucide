import path from 'path';
import icons from '../icons.json';
import { writeFile } from './helpers';

const newCategories = {};
Object.keys(icons.icons).forEach(iconName => {
  icons.icons[iconName].categories.forEach(categoryName => {
    newCategories[categoryName] = newCategories[categoryName] || [];
    newCategories[categoryName].push(iconName);
  });
});

const categoriesContent = JSON.stringify(newCategories, null, 2);

writeFile(categoriesContent, 'categories.json', path.resolve(__dirname, '..'));
