import path from 'path';
import fs from 'fs';
import { getCurrentDirPath, readAllMetadata } from './helpers.mjs';
import {releaseCachePath} from "./release-cache/helpers.mjs";

const currentDir = getCurrentDirPath(import.meta.url)
const ICONS_DIR = path.resolve(currentDir, '../icons');
const icons = readAllMetadata(ICONS_DIR);

let releaseCache = {};
if (fs.existsSync(releaseCachePath)) {
  releaseCache = JSON.parse(fs.readFileSync(releaseCachePath));
}

let error = false;
Object.keys(releaseCache).forEach(iconName => {
  if (!(iconName in icons)) {
    console.error(`Invalid icon name '${iconName}' in release cache. Have you perhaps renamed or deleted this icon?.`);
    error = true;
  }
});

if (error) {
  console.error('At least one error in icon JSONs prevents from committing changes.');
  process.exit(1);
} else {
  console.info('Icon release cache seems up to date.');
}
