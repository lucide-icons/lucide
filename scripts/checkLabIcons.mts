import path from 'path';
import {
  readSvgDirectory,
  getCurrentDirPath,
  getAllIconAliases,
} from '../tools/build-helpers/helpers.ts';

const currentDir = getCurrentDirPath(import.meta.url);
const ICONS_DIR = path.resolve(currentDir, '../icons');
const LAB_DIR = path.resolve(currentDir, '../lab');

console.log('Checking lab icons against the icons directory');

// Build a map of every identifier that exists in the icons directory (base name
// or alias) to the icon that owns it, so we can explain why a collision happened.
const iconNamespace = new Map<string, string>();

const iconSvgFiles = await readSvgDirectory(ICONS_DIR);
iconSvgFiles.forEach((file) => {
  const iconName = file.split('.')[0];
  iconNamespace.set(iconName, iconName);
});

const iconAliases = await getAllIconAliases(ICONS_DIR);
iconAliases.forEach(([iconName, aliases]) => {
  aliases.forEach((alias) => {
    // Don't let an alias shadow a real icon name in the message.
    if (!iconNamespace.has(alias)) {
      iconNamespace.set(alias, iconName);
    }
  });
});

// Gather each lab icon's own identifiers: its base name plus any aliases.
const labSvgFiles = await readSvgDirectory(LAB_DIR);
const labIconNames = labSvgFiles.map((file) => file.split('.')[0]);

const labAliasesByIcon = new Map<string, string[]>();
const labAliases = await getAllIconAliases(LAB_DIR);
labAliases.forEach(([iconName, aliases]) => {
  labAliasesByIcon.set(iconName, aliases);
});

let error = false;

labIconNames.forEach((labIconName) => {
  const identifiers = [labIconName, ...(labAliasesByIcon.get(labIconName) ?? [])];

  identifiers.forEach((identifier) => {
    const owner = iconNamespace.get(identifier);

    if (owner === undefined) return;

    const via = identifier === labIconName ? '' : ` (via alias '${identifier}')`;
    const as = owner === identifier ? `'${owner}'` : `an alias of '${owner}'`;

    console.error(`Lab icon '${labIconName}'${via} already exists in icons as ${as}.`);
    error = true;
  });
});

if (error) {
  console.error('At least one lab icon already exists in the icons directory.');
  process.exit(1);
}

console.log(`No duplicates found: all ${labIconNames.length} lab icons are unique.`);
