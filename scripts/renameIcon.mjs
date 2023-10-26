const simpleGit = require('simple-git');
const fs = require('fs');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const oldName = require('path')
  .basename(process.argv[2])
  .replace(/\.[^/.]+$/, '');
const newName = require('path')
  .basename(process.argv[3])
  .replace(/\.[^/.]+$/, '');

if (!newName || !oldName) {
  console.error('Usage: node script.js <oldIcon> <newIcon>');
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
    try {
      await exec('jq --version');
    } catch (error) {
      console.error('ERROR: jq is not installed.');
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

function fileExists(filePath) {
  return promisify(fs.access)(filePath)
    .then(() => true)
    .catch(() => false);
}

main();
