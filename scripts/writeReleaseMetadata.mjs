import { CleanOptions, simpleGit } from 'simple-git';
import semver from 'semver';
import fs from 'fs';
import path from 'path';
import { readSvgDirectory } from './helpers.mjs';

const currentDir = process.cwd();
const ICONS_DIR = path.resolve(currentDir, '../icons');
const iconJsonFiles = readSvgDirectory(ICONS_DIR, '.json');

const location = path.resolve(currentDir, '.vitepress/data', 'releaseMetaData.json');

if (fs.existsSync(location)) {
  fs.unlinkSync(location);
}

export const releaseMin = (a, b) => {
  if (!a) return b;
  if (!b) return a;
  return semver.gt(a.version, b.version) ? b : a;
};

export const releaseMax = (a, b) => {
  if (!a) return b;
  if (!b) return a;
  return semver.gt(a.version, b.version) ? a : b;
};

export const updateReleaseMetadataWithCommit = (metadata, date, release) => {
  metadata = metadata || {};
  metadata.createdRelease = releaseMin(metadata.createdRelease, release);
  metadata.changedRelease = releaseMax(metadata.changedRelease, release);
};

export const fetchAllReleases = async () =>
  (
    await Promise.all(
      (
        await simpleGit().raw('show-ref', '--tags', '-d')
      )
        .trim()
        .split(/\n/)
        .map(async (line) => {
          const [commit, ref] = line.split(/ /);
          if (ref == null || !ref.startsWith('refs/tags/') || commit == null) return null;
          const { version = null } = semver.coerce(ref.replace('refs/tags/', '')) ?? {};
          const date = (await simpleGit().show(['-s', '--format=%cI', commit])).trim();
          return { version, date };
        }),
    )
  ).filter(({ version }) => semver.valid(version));

simpleGit().clean(CleanOptions.FORCE);

const findRelease = (date, releases) => {
  let closestRelease = null;
  for (const release of releases) {
    if (release.date >= date && (closestRelease === null || release.date < closestRelease.date)) {
      closestRelease = release;
    }
  }
  return closestRelease;
};

const fetchCommits = async (name) => {
  const file = `../icons/${name}.svg`;
  const { all: commits } = await simpleGit().log(['--reverse', '--follow', '--', file]);
  return commits;
};

export const getReleaseMetadata = async (name, aliases, releases) => {
  const metadata = { name };
  for (const alias of [name, ...(aliases ?? [])]) {
    const commits = await fetchCommits(alias);
    for (const commit of commits) {
      const date = new Date(commit.date).toISOString();
      const release = findRelease(date, releases);
      updateReleaseMetadataWithCommit(metadata, date, release);
    }
  }
  return metadata;
};

const releases = await fetchAllReleases();
const releaseMetaData = (
  await Promise.all(
    iconJsonFiles.map((iconJsonFile) => {
      const iconName = path.basename(iconJsonFile, '.json');
      const { aliases } = JSON.parse(fs.readFileSync(path.join(ICONS_DIR, iconJsonFile)));
      return getReleaseMetadata(iconName, aliases, releases);
    }),
  )
).reduce((acc, { name, ...rest }) => {
  acc[name] = rest;
  return acc;
}, {});

fs.promises
  .writeFile(location, JSON.stringify(releaseMetaData, null, 2), 'utf-8')
  .then(() => {
    console.log('Successfully written icon release meta cache file');
  })
  .catch((error) => {
    throw new Error(`Something went wrong generating icon release meta cache file,\n ${error}`);
  });
