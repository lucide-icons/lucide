import simpleGit from 'simple-git';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

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

const git = simpleGit();

async function main() {
  try {
    if (await fileExists(`icons/${newName}.svg`)) {
      console.error(`ERROR: Icon icons/${newName}.svg already exists`);
      process.exit(1);
    }
    if (await fileExists(`icons/${newName}.json`)) {
      console.error(`ERROR: Metadata file icons/${newName}.json already exists`);
      process.exit(1);
    }
    if (!(await fileExists(`icons/${oldName}.svg`))) {
      console.error(`ERROR: Icon icons/${oldName}.svg doesn't exist`);
      process.exit(1);
    }
    if (!(await fileExists(`icons/${oldName}.json`))) {
      console.error(`ERROR: Metadata file icons/${oldName}.json doesn't exist`);
      process.exit(1);
    }

    await git.mv(`icons/${oldName}.svg`, `icons/${newName}.svg`);
    await git.mv(`icons/${oldName}.json`, `icons/${newName}.json`);
    const json = fs.readFileSync(`icons/${newName}.json`, 'utf8');
    const jsonData = JSON.parse(json);
    if (Array.isArray(jsonData.aliases)) {
      jsonData.aliases.push(oldName);
    } else {
      jsonData.aliases = [oldName];
    }
    fs.writeFileSync(`icons/${newName}.json`, JSON.stringify(jsonData, null, 2));
    await git.add(`icons/${newName}.json`);

    console.log('SUCCESS: Next steps:');
    console.log(`git checkout -b rename/${oldName}-to-${newName};`);
    console.log(`git commit -m 'Renamed ${oldName} to ${newName}';`);
    console.log(`gh pr create --title 'Renamed ${oldName} to ${newName}';`);
    console.log('git checkout main;');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

async function fileExists(filePath) {
  try {
    await promisify(fs.access)(filePath);
    return true;
  } catch {
    return false;
  }
}

main();
