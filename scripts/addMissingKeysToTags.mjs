import path from 'path';
import tags from '../tags.json' assert { type: 'json' };
import { readSvgDirectory, writeFile, getCurrentDirPath } from './helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url)
const ICONS_DIR = path.resolve(currentDir, '../icons');

console.log(`Read all tags`);

const svgFiles = readSvgDirectory(ICONS_DIR);

const iconNames = svgFiles.map(icon => icon.split('.')[0]);

const iconTags = iconNames
  .map(iconName => ({
    name: iconName,
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

const newTags = iconTags.reduce((acc, { name, tags }) => {
  acc[name] = tags;

  return acc;
}, {});

const tagsContent = JSON.stringify(newTags, null, 2);

writeFile(tagsContent, 'tags.json', path.resolve(currentDir, '..'));
