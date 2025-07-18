import fs from 'fs';
import path from 'path';
import { parseSync } from 'svgson';

import { readSvgDirectory, getCurrentDirPath } from '@lucide/helpers';
import readSvgs from './readSvgs.mts';
import generateSprite from './generateSprite.mts';
import generateIconNodes from './generateIconNodes.mts';
import copyIcons from './copyIcons.mts';

import pkg from '../package.json' with { type: 'json' };

const createDirectory = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const currentDir = getCurrentDirPath(import.meta.url);

const PACKAGE_DIR = path.resolve(currentDir, '../');
const ICONS_DIR = path.join(PACKAGE_DIR, '../../icons');
const LIB_DIR = path.join(PACKAGE_DIR, 'lib');
const ICON_MODULE_DIR = path.join(LIB_DIR, 'icons');

const license = `@license ${pkg.name} v${pkg.version} - ${pkg.license}`;

createDirectory(LIB_DIR);
createDirectory(ICON_MODULE_DIR);

const svgFiles = await readSvgDirectory(ICONS_DIR);
const svgs = await readSvgs(svgFiles, ICONS_DIR);

await Promise.all([
  generateSprite(svgs, PACKAGE_DIR, license),
  generateIconNodes(svgs, PACKAGE_DIR),
  copyIcons(svgs, PACKAGE_DIR, license),
]);
