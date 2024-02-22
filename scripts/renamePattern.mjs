import path from 'path';
import {getCurrentDirPath, readSvgDirectory, renameIcon} from './helpers.mjs';

async function main() {
  const currentDir = getCurrentDirPath(import.meta.url);
  const ICONS_DIR = path.resolve(currentDir, '../icons');
  const svgFiles = readSvgDirectory(ICONS_DIR);
  const iconNames = svgFiles.map((icon) => icon.split('.')[0]).reverse();

  const pattern = new RegExp(process.argv[2], 'g');
  const replacement = process.argv[3].replaceAll(/\\([0-9]+)/g, (s, i) => `$${i}`);
  const dryRun = process.argv[4] ?? false;

  if (!pattern || !replacement) {
    console.error('Usage: pnpm renamePattern <oldRegExp> <newReplacement>');
    process.exit(1);
  }
  if (!(pattern instanceof RegExp)) {
    console.error(`${pattern} is not a valid regular expression.`);
    process.exit(1);
  }
  if (!replacement) {
    console.error(`No replacement string provided.`);
    process.exit(1);
  }

  for (let oldName of iconNames.filter(name => pattern.test(name))) {
    const newName = oldName.replaceAll(pattern, replacement);
    console.log(`Renaming ${oldName} => ${newName}`);

    try {
      if (!dryRun) {
        await renameIcon(ICONS_DIR, oldName, newName, false);
      }
    } catch (err) {
      console.error(err.message);
    }
  }
}

main();
