import path from 'path';
import { getCurrentDirPath } from '../../tools/build-helpers/helpers.mjs';
import { renameIcon } from './renameIcon.function.mjs';

async function main() {
  const oldName = path.basename(process.argv[2]).replace(/\.[^/.]+$/, '');
  const newName = path.basename(process.argv[3]).replace(/\.[^/.]+$/, '');

  if (!newName || !oldName) {
    console.error('Usage: node ./scripts/renameIcon.mjs <oldIcon> <newIcon>');
    process.exit(1);
  }
  if (oldName === newName) {
    console.error('ERROR: Old name and new name are the same');
    process.exit(1);
  }

  try {
    const currentDir = getCurrentDirPath(import.meta.url);
    const ICONS_DIR = path.resolve(currentDir, '../../icons');
    await renameIcon(ICONS_DIR, oldName, newName);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

main();
