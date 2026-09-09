import path from 'path';
import { writeFile, getCurrentDirPath, readAllMetadata } from '@lucide/helpers';

const currentDir = getCurrentDirPath(import.meta.url);

const PACKAGE_DIR = path.resolve(currentDir, '../');
const ICONS_DIR = path.join(PACKAGE_DIR, '../../icons');
const icons = await readAllMetadata(ICONS_DIR);

const tags = Object.keys(icons)
  .sort()
  .reduce((acc, iconName) => {
    acc[iconName] = icons[iconName].tags;
    return acc;
  }, {});

const tagsContent = JSON.stringify(tags, null, 2);

await writeFile(tagsContent, 'tags.json', path.resolve(process.cwd()));
