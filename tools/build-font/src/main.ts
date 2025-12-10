import getArgumentOptions from 'minimist';
import path from 'path';
import { promises as fs } from 'fs';

import { getAllIconAliases } from '@lucide/helpers';
import { outlineSVG } from './outlineSVGs.ts';
import { allocateCodePoints } from './allocateCodepoints.ts';
import { buildFont } from './buildFont.ts';

const fontName = 'lucide';
const classNamePrefix = 'icon';
const startUnicode = 57400;
const outputDir = 'lucide-font';

const {
  saveCodePoints = false,
} = getArgumentOptions(process.argv.slice(2)) ?? {}

const repoRoot = path.join(process.cwd(), '../../')
const iconsDir = path.join(repoRoot, 'icons');
const outlinedDir = path.join(repoRoot, 'outlined');
const targetDir = path.join(repoRoot, outputDir);

const iconsWithAliases = await getAllIconAliases(iconsDir)

await outlineSVG({
  iconsDir,
  outlinedDir,
  iconsWithAliases
});

const codePoints = await allocateCodePoints({
  saveCodePoints,
  iconsWithAliases
});

// Check if all icons and aliases exist in the codePoints
const missingIcons = iconsWithAliases.map(([iconName, aliases]) => ([iconName, ...aliases])).flat().some(name => {
  if (!codePoints?.[name]) {
    console.log(`Missing codepoint for icon/alias: ${name}`);
    return true;
  }
  return false;
});

if (missingIcons) {
  throw new Error('Some icons or aliases are missing codepoints. See log for details.');
}

await buildFont({
  inputDir: outlinedDir,
  targetDir,
  fontName,
  classNamePrefix,
  codePoints,
  startUnicode,
});

await fs.copyFile(path.join(process.cwd(), 'codepoints.json'), path.join(targetDir, 'codepoints.json'));
