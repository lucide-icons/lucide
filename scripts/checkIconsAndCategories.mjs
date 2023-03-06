import path from 'path';
import { readSvgDirectory, getCurrentDirPath, readAllMetadata } from './helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url)
const ICONS_DIR = path.resolve(currentDir, '../icons');
const icons = readAllMetadata(ICONS_DIR);
const CATEGORIES_DIR = path.resolve(currentDir, '../categories');
const categories = readAllMetadata(CATEGORIES_DIR);

console.log('Reading all icons')

const svgFiles = readSvgDirectory(ICONS_DIR);
const iconNames = svgFiles.map(icon => icon.split('.')[0]);

let error = false;

iconNames.forEach(iconName => {
  if (typeof icons[iconName] === 'undefined') {
    console.error(`'${iconName}.svg' does not have a matching JSON file.`);
    error = true;
  }
});

Object.keys(icons).forEach(iconName => {
  const icon = icons[iconName];
  if (iconNames.indexOf(iconName) === -1) {
    console.error(`'${iconName}.svg' does not exist.`);
    error = true;
  }
  icon.categories.forEach(categoryName => {
    if (typeof categories[categoryName] === 'undefined') {
      console.error(`Icon '${iconName}' refers to the non-existing category '${categoryName}'.`);
      error = true;
    }
  });
});

Object.keys(categories).forEach(categoryName => {
  const category = categories[categoryName];
  if (!category.icon) {
    console.error(`Category '${categoryName}' does not use an icon '${category.icon}'.`);
    error = true;
  } else if (typeof icons[category.icon] === 'undefined') {
    console.error(`Category '${categoryName}' uses the non-existing icon '${category.icon}'.`);
    error = true;
  }
});

if (error) {
  console.error('At least one error in icon JSONs prevents from committing changes.');
  process.exit(1);
}
