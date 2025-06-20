import path from 'path';
import { getCurrentDirPath, writeFileIfNotExists } from '../../tools/build-helpers/helpers.ts';

const currentDir = getCurrentDirPath(import.meta.url);
const ICONS_DIR = path.resolve(currentDir, '../../icons');

const iconNames = process.argv.slice(2);

const iconSvgTemplate = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
</svg>
`;

const iconJsonTemplate = `{
  "$schema": "../icon.schema.json",
  "contributors": [
  ],
  "tags": [
  ],
  "categories": [
  ]
}
`;

iconNames.forEach((iconName) => {
  writeFileIfNotExists(iconSvgTemplate, `${iconName}.svg`, ICONS_DIR);
  writeFileIfNotExists(iconJsonTemplate, `${iconName}.json`, ICONS_DIR);
});
