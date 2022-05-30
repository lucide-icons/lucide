import path from 'path';
import tags from '../tags.json';
import icons from '../icons.json';
import { readSvgDirectory, writeFile, mergeArrays } from './helpers';

const ICONS_DIR = path.resolve(__dirname, '../icons');

console.log(`Read all icons`);

const svgFiles = readSvgDirectory(ICONS_DIR);

const iconNames = svgFiles.map(icon => icon.split('.')[0]);

const iconList = iconNames
  .map(iconName => ({
    name: iconName,
    icon: icons.icons[iconName] || { tags: [], categories: [] },
    tags: tags[iconName] || [],
  }))
  .sort((a, b) => {
    const nameA = a.name;
    const nameB = b.name;

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

const newIcons = icons;

newIcons.icons = iconList.reduce((acc, { name, icon, tags }) => {
  acc[name] = icon;
  acc[name].tags = mergeArrays(icon.tags, tags);

  return acc;
}, {});

const iconsContent = JSON.stringify(newIcons, null, 2);

writeFile(iconsContent, 'icons.json', path.resolve(__dirname, '..'));
