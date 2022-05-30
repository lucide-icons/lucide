import path from 'path';
import icons from '../icons.json';
import {readSvgDirectory} from './helpers';

const ICONS_DIR = path.resolve(__dirname, '../icons');

console.log(`Read all icons`);

const svgFiles = readSvgDirectory(ICONS_DIR);

const iconNames = svgFiles.map(icon => icon.split('.')[0]);

let error = false;

iconNames.forEach(iconName => {
  if (typeof icons.icons[iconName] === 'undefined') {
    console.error(`'${iconName}.svg' is not present in 'icons.json'.`);
    error = true;
  }
});

Object.keys(icons.icons).forEach(iconName => {
  const icon = icons.icons[iconName];
  if (iconNames.indexOf(iconName) === -1) {
    console.error(`'${iconName}.svg' does not exist.`);
    error = true;
  }
  icon.categories.forEach(categoryName => {
    if (typeof icons.categories[categoryName] === 'undefined') {
      console.error(`Icon '${iconName}' refers to the non-existing category '${categoryName}'.`);
      error = true;
    }
  });
});

Object.keys(icons.categories).forEach(categoryName => {
  const category = icons.categories[categoryName];
  if (!category.icon) {
    console.error(`Category '${categoryName}' does not use an icon '${category.icon}'.`);
    error = true;
  } else if (typeof icons.icons[category.icon] === 'undefined') {
    console.error(`Category '${categoryName}' uses the non-existing icon '${category.icon}'.`);
    error = true;
  }
});

if (error) {
  throw new Error('At least one error in icons.json prevents from committing changes.');
}
