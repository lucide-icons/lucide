import path from 'path';
import { getCurrentDirPath, readAllMetadata, readSvgDirectory, writeFile } from './helpers.mjs';

const currentDir = getCurrentDirPath(import.meta.url);
const ICONS_DIR = path.resolve(currentDir, '../icons');
const icons = readAllMetadata(ICONS_DIR);

const svgFiles = readSvgDirectory(ICONS_DIR);

const iconNames = svgFiles.map((icon) => icon.split('.')[0]).reverse();

iconNames.forEach((iconName) => {
  console.log(iconName);
  const camelCasedName = iconName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

  console.log(camelCasedName);
  const KebabCaseName = iconName.replace(/[A-Z]+(?![a-z])|[A-Z]/g, '$1-$2').toLowerCase();

  console.log(KebabCaseName);
});
