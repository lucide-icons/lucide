import path from 'path';
import {
  readSvgDirectory,
  getCurrentDirPath,
  readAllMetadata,
  readMetadata,
  readTagGroups,
} from '../tools/build-helpers/helpers.ts';
import { type IconMetadata } from '../tools/build-icons/types.ts';

const currentDir = getCurrentDirPath(import.meta.url);
const ICONS_DIR = path.resolve(currentDir, '../icons');
let icons: Record<string, IconMetadata>;

try {
  icons = await readAllMetadata(ICONS_DIR) as Record<string, IconMetadata>;
} catch (error) {
  console.error(`Failed to read icon metadata: ${error instanceof Error ? error.message : String(error)}`);
  console.error('This may be due to invalid extends or tag group references, or circular dependencies.');
  process.exit(1);
}

const CATEGORIES_DIR = path.resolve(currentDir, '../taxonomy/categories');
const categories = await readAllMetadata(CATEGORIES_DIR) as Record<string, {
  icon: string;
  name: string;
}>;;

console.log('Reading all icons');

const svgFiles = await readSvgDirectory(ICONS_DIR);
const iconNames = svgFiles.map((icon) => icon.split('.')[0]);

let error = false;

iconNames.forEach((iconName) => {
  if (typeof icons[iconName] === 'undefined') {
    console.error(`'${iconName}.svg' does not have a matching JSON file.`);
    error = true;
  }
});

Object.keys(icons).forEach((iconName) => {
  const icon = icons[iconName];
  if (iconNames.indexOf(iconName) === -1) {
    console.error(`'${iconName}.svg' does not exist.`);
    error = true;
  }
  icon.categories?.forEach((categoryName) => {
    if (typeof categories[categoryName] === 'undefined') {
      console.error(`Icon '${iconName}' refers to the non-existing category '${categoryName}'.`);
      error = true;
    }
  });
});

const EXTENDS_PREFIX = '$extends:';
const GROUP_PREFIX = '$group:';

const MARKED_FIELDS = ['tags', 'categories', 'contributors'] as const;
type MarkedField = (typeof MARKED_FIELDS)[number];

const FIELD_LABELS: Record<MarkedField, string> = {
  tags: 'tag',
  categories: 'category',
  contributors: 'contributor',
};

const isMarker = (entry: string) =>
  entry.startsWith(EXTENDS_PREFIX) || entry.startsWith(GROUP_PREFIX);

const tagGroups = await readTagGroups();
const usedTagGroups = new Set<string>();

// `readAllMetadata` expands the markers, so the duplicate checks below read the
// JSON as it is written on disk to see which entries are literals.
const iconJsonFiles = await readSvgDirectory(ICONS_DIR, '.json');
const rawIcons = Object.fromEntries(
  await Promise.all(
    iconJsonFiles.map(async (file) => [
      path.basename(file, '.json'),
      (await readMetadata(file, ICONS_DIR)) as Partial<Record<MarkedField, string[]>>,
    ]),
  ),
) as Record<string, Partial<Record<MarkedField, string[]>>>;

/** The values a single marker contributes to `field`. */
const resolveMarker = (marker: string, field: MarkedField): string[] => {
  if (marker.startsWith(GROUP_PREFIX)) {
    const groupName = marker.slice(GROUP_PREFIX.length);
    usedTagGroups.add(groupName);

    return tagGroups[groupName] ?? [];
  }

  const parentName = marker.slice(EXTENDS_PREFIX.length);

  return (icons[parentName]?.[field] as string[] | undefined) ?? [];
};

Object.entries(rawIcons).forEach(([iconName, rawMetadata]) => {
  MARKED_FIELDS.forEach((field) => {
    const entries = rawMetadata[field] ?? [];
    const literals = new Set(entries.filter((entry) => !isMarker(entry)));
    const seenMarkers = new Set<string>();

    entries.filter(isMarker).forEach((marker) => {
      if (seenMarkers.has(marker)) {
        console.error(
          `Icon '${iconName}': '${marker}' is listed twice in '${field}' — remove the duplicate marker.`,
        );
        error = true;
        return;
      }
      seenMarkers.add(marker);

      resolveMarker(marker, field)
        .filter((value) => literals.has(value))
        .forEach((value) => {
          console.error(
            `Icon '${iconName}': ${FIELD_LABELS[field]} '${value}' is already provided by ${marker} — remove the literal.`,
          );
          error = true;
        });
    });
  });
});

Object.keys(categories).forEach((categoryName) => {
  const category = categories[categoryName];
  if (!category?.icon) {
    console.error(`Category '${categoryName}' does not use an icon '${category.icon}'.`);
    error = true;
  } else if (typeof icons[category.icon] === 'undefined') {
    console.error(`Category '${categoryName}' uses the non-existing icon '${category.icon}'.`);
    error = true;
  }
});

Object.keys(tagGroups)
  .filter((groupName) => !usedTagGroups.has(groupName))
  .forEach((groupName) => {
    console.warn(`Tag group '${groupName}' is not used by any icon.`);
  });

if (error) {
  console.error('At least one error in icon JSONs prevents from committing changes.');
  process.exit(1);
}
