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

const aliases = (await Promise.all(
  (await readSvgDirectory(ICONS_DIR, '.json')).map(async (metadataFile) => {
    const filePath = path.join(ICONS_DIR, metadataFile);
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    const { aliases }: {aliases: undefined | (string | { name: string })[]} = JSON.parse(fileContent);
    if (!aliases?.length) return [];
    const svgName = path.basename(metadataFile, '.json');
    const svg = svgs.find((s) => s.name === svgName);
    if (!svg) return [];
    return aliases.map(alias => ({
      ...svg,
      name: typeof alias === 'string' ? alias : alias.name,
    }));
  })
)).flat();

await Promise.all([
  generateSprite(svgs, PACKAGE_DIR, license),
  generateIconNodes(svgs, PACKAGE_DIR),
  copyIcons([...svgs, ...aliases], PACKAGE_DIR, license),
]);
