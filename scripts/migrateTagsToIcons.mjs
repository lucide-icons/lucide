import path from 'path';
import tags from '../tags.json' with { type: 'json' };
import {
  readSvgDirectory,
  readAllMetadata,
  writeFile,
  mergeArrays,
  getCurrentDirPath,
} from '../tools/build-helpers/helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url);
const ICONS_DIR = path.resolve(currentDir, '../icons');
const icons = readAllMetadata(ICONS_DIR);
const svgFiles = readSvgDirectory(ICONS_DIR);

const iconNames = svgFiles.map((icon) => icon.split('.')[0]);

iconNames.forEach((iconName) => {
  icons[iconName] = icons[iconName] || {
    $schema: '../icon.schema.json',
    tags: [],
    categories: [],
  };
  icons[iconName].tags = mergeArrays(icons[iconName].tags, tags[iconName]);
  const iconContent = JSON.stringify(icons[iconName], null, 2);
  writeFile(iconContent, `${iconName}.json`, path.resolve(currentDir, '../icons'));
});
