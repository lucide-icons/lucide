import path from 'path';
import { promises as fs } from 'fs';
import { getCurrentDirPath, readSvgDirectory } from '../tools/build-helpers/helpers.ts';

// This is a special case convertion NextJS uses for their modularize imports. We try to follow the same convention, to generate the same imports.
function pascalToKebabNextJSFlavour(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z])-?([0-9]+|[A-Z])/g, '$1-$2')
    .replace(/([0-9]+)-?([a-zA-Z])/g, '$1-$2')
    .replace(/([0-9])-([0-9])/g, '$1$2')
    .split('-')
    .map((word) => word.toLowerCase())
    .join('-');
}

const currentDir = getCurrentDirPath(import.meta.url);
const ICONS_DIR = path.resolve(currentDir, '../icons');

const svgFiles = await readSvgDirectory(ICONS_DIR);

const iconNames = svgFiles.map((icon) => icon.split('.')[0]).reverse();

console.log('Creating aliases for NextJS imports: ');

Promise.all(
  iconNames.map(async (iconName) => {
    const pascalCaseName = iconName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

    const iconNameKebabCaseNextjsFlavour = pascalToKebabNextJSFlavour(pascalCaseName);

    if (iconName !== iconNameKebabCaseNextjsFlavour) {
      console.log(iconName, '➡️', iconNameKebabCaseNextjsFlavour);

      const metaJson = await fs.readFile(path.resolve(ICONS_DIR, `${iconName}.json`), 'utf-8');
      const iconMetaData = JSON.parse(metaJson);

      const aliases = iconMetaData.aliases ?? [];
      if (!aliases.includes(iconNameKebabCaseNextjsFlavour)) {
        aliases.push(iconNameKebabCaseNextjsFlavour);
      }

      let output = JSON.stringify({ ...iconMetaData, aliases }, null, 2);
      output = `${output}\n`;
      fs.writeFile(path.resolve(ICONS_DIR, `${iconName}.json`), output, 'utf-8');
    }
  }),
);
