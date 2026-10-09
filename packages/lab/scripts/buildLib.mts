import path from 'path';

import { readSvgDirectory, getCurrentDirPath } from '@lucide/helpers';
import readSvgs from './readSvgs.mts';
import generateIconNodes from './generateIconNodes.mts';
import copyIcons from './copyIcons.mts';

import pkg from '../package.json' with { type: 'json' };

const currentDir = getCurrentDirPath(import.meta.url);

const PACKAGE_DIR = path.resolve(currentDir, '../');
const ICONS_DIR = path.join(PACKAGE_DIR, '../../lab');

const license = `@license ${pkg.name} v${pkg.version} - ${pkg.license}`;

const svgFiles = await readSvgDirectory(ICONS_DIR);
const svgs = await readSvgs(svgFiles, ICONS_DIR);

await Promise.all([generateIconNodes(svgs, PACKAGE_DIR), copyIcons(svgs, PACKAGE_DIR, license)]);
