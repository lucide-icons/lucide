import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const directory = path.join(process.cwd(), 'icons');

async function getAllIcons() {
  const fileNames = await fs.promises.readdir(directory);

  return fileNames.map(fileName => fileName.replace(/\.svg$/, ''));
}

const getContributersOfIcon = name =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `https://api.github.com/repos/lucide-icons/lucide/commits?path=icons/${name}.svg`,
      );
      const data = await res.json();

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });

// eslint-disable-next-line func-names
(async function() {
  let icons = await getAllIcons();
  icons = icons.slice(48, 58);
  const commits = await Promise.all(icons.map(getContributersOfIcon));

  // const skipCommitMessages = ['fork', 'optimize'];
  // const filteredCommits = commits.filter(({ commit }) =>
  //   !skipCommitMessages.includes(commit.message),
  // );
  console.log(commits);
})();
