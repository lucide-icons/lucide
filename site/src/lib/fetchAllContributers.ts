/* eslint-disable no-unused-vars */
import fs from 'fs';
import path from 'path';
// import commits from '../contributers.json';
import fetch, { Headers } from 'node-fetch';

const directory = path.join(process.cwd(), 'icons');

async function getAllIcons() {
  const fileNames = await fs.promises.readdir(directory);

  return fileNames.map(fileName => fileName.replace(/\.svg$/, ''));
}

const getContributersOfIcon = name =>
  new Promise(async (resolve, reject) => {
    try {
      const headers = new Headers();
      const username = 'ericfennis';
      const password = '';
      headers.set(
        'Authorization',
        `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
      );
      const res = await fetch(
        `https://api.github.com/repos/lucide-icons/lucide/commits?path=icons/${name}.svg`,
        {
          method: 'GET',
          headers,
        },
      );
      const data = await res.json();

      setTimeout(() => {
        resolve({
          name,
          commits: data,
        });
      }, 50);
    } catch (error) {
      reject(error);
    }
  });

// eslint-disable-next-line func-names
(async function() {
  try {
    const icons = await getAllIcons();
    // icons = icons.slice(300, 320);
    const AllIconCommits = await Promise.all(icons.map(getContributersOfIcon));

    const ignoreCommitMessages = ['fork', 'optimize'];
    const filteredCommits = AllIconCommits.reduce((acc, { name, commits }) => {
      if (commits && commits.length)
        acc[name] = commits
          .filter(
            ({ commit }) =>
              !ignoreCommitMessages.some(ignoreItem =>
                commit.message.toLowerCase().includes(ignoreItem),
              ),
          )
          .map(({ sha, author, commit }) => ({
            author: author && author.login ? author.login : null,
            commit: sha,
          }));
      return acc;
    }, {});
    const json = JSON.stringify(filteredCommits);
    fs.writeFileSync('contributers.json', json, 'utf-8');
  } catch (error) {
    console.error(error);
  }
})();
