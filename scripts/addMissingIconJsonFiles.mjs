import path from 'path';
import {getCurrentDirPath, readAllMetadata, readSvgDirectory, writeFile} from './helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url);
const ICONS_DIR = path.resolve(currentDir, '../icons');
const icons = readAllMetadata(ICONS_DIR);

const svgFiles = readSvgDirectory(ICONS_DIR);

const iconNames = svgFiles.map((icon) => icon.split('.')[0]);

iconNames.forEach(iconName => {
  if (typeof icons[iconName] === 'undefined') {
    const iconContent = JSON.stringify({
      "$schema": "../icon.schema.json",
      "tags": [],
      "categories": []
    }, null, 2);
    writeFile(iconContent, `${iconName}.json`, path.resolve(currentDir, '..'));
  }
});
