import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import simpleGit from 'simple-git';
import { type IconMetadata } from '../../tools/build-icons/types.ts';

/**
 * Renames an icon and adds the old name as an alias.
 * @param {string} ICONS_DIR
 * @param {string} oldName
 * @param {string} newName
 * @param {boolean} logInfo
 * @param {boolean} addAlias
 */
export async function renameIcon(ICONS_DIR: string, oldName: string, newName: string, logInfo = true, addAlias = true) {
  const git = simpleGit();

  async function fileExists(filePath: string) {
    try {
      await promisify(fs.access)(filePath);
      return true;
    } catch {
      return false;
    }
  }
  const oldSvgPath = path.join(ICONS_DIR, `${oldName}.svg`);
  const newSvgPath = path.join(ICONS_DIR, `${newName}.svg`);
  const oldJsonPath = path.join(ICONS_DIR, `${oldName}.json`);
  const newJsonPath = path.join(ICONS_DIR, `${newName}.json`);

  if (await fileExists(newSvgPath)) {
    throw new Error(`ERROR: Icon icons/${newName}.svg already exists`);
  }
  if (await fileExists(newJsonPath)) {
    throw new Error(`ERROR: Metadata file icons/${newName}.json already exists`);
  }
  if (!(await fileExists(oldSvgPath))) {
    throw new Error(`ERROR: Icon icons/${oldName}.svg doesn't exist`);
  }
  if (!(await fileExists(oldJsonPath))) {
    throw new Error(`ERROR: Metadata file icons/${oldName}.json doesn't exist`);
  }

  await git.mv(oldSvgPath, newSvgPath);
  await git.mv(oldJsonPath, newJsonPath);
  if (addAlias) {
    const json = fs.readFileSync(newJsonPath, 'utf8');
    const jsonData: IconMetadata = JSON.parse(json);
    jsonData.aliases = [
      ...(jsonData.aliases ?? []),
      {
        name: oldName,
        deprecate: true,
        deprecationReason: 'alias.name',
        toBeRemovedInVersion: 'v1.0',
      },
    ];
    fs.writeFileSync(newJsonPath, JSON.stringify(jsonData, null, 2));
    await git.add(newJsonPath);
  }

  if (logInfo) {
    console.log('SUCCESS: Next steps:');
    console.log(`git checkout -b rename/${oldName}-to-${newName};`);
    console.log(`git commit -m 'Renamed ${oldName} to ${newName}';`);
    console.log(`gh pr create --title 'Renamed ${oldName} to ${newName}';`);
    console.log('git checkout main;');
  }
}
