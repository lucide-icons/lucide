import githubApi from './githubApi.mjs';
import fs from 'fs';
import semver from 'semver';
import path from 'path';
import {getCurrentDirPath, readAllMetadata} from "./helpers.mjs";
import {CleanOptions, simpleGit} from 'simple-git';

const currentDir = getCurrentDirPath(import.meta.url);
const ICONS_DIR = path.resolve(currentDir, '../icons');
const icons = readAllMetadata(ICONS_DIR);

const fetchCommits = async (file) => {
  const commits = await githubApi(
    `https://api.github.com/repos/lucide-icons/lucide/commits?path=${file.filename}`,
  );

  return {...file, commits};
};

const releaseCachePath = 'icon-releases.json';

let releaseCache = {};
if (fs.existsSync(releaseCachePath)) {
  releaseCache = JSON.parse(fs.readFileSync(releaseCachePath));
}

const semverMin = (a, b) => {
  if (!a || !semver.valid(a)) return b;
  if (!b || !semver.valid(b)) return a;
  return semver.gt(a, b) ? b : a;
}

const semverMax = (a, b) => {
  if (!a || !semver.valid(a)) return b;
  if (!b || !semver.valid(b)) return a;
  return semver.gt(a, b) ? a : b;
}

const updateIconReleaseCache = async (iconName, releases) => {
  const {commits} = await fetchCommits({filename: `icons/${iconName}.svg`});
  for (let commit of commits) {
    releaseCache[iconName] = releaseCache[iconName] || {};
    releaseCache[iconName].contributors = releaseCache[iconName].contributors || [];
    if (commit.author?.login && !releaseCache[iconName].contributors.includes(commit.author?.login)) {
      releaseCache[iconName].contributors.push(commit.author?.login);
    }
    const release = findRelease(commit.commit?.author?.date, releases);
    if (release) {
      releaseCache[iconName].createdRelease = semverMin(releaseCache[iconName].createdRelease, release.version);
      releaseCache[iconName].changedRelease = semverMax(releaseCache[iconName].changedRelease, release.version);
      releaseCache[iconName].updated = release.date;
    }
  }
};

simpleGit().clean(CleanOptions.FORCE);
const releases = await Promise.all((await simpleGit().raw('show-ref', '--tags', '-d')).trim().split(/\n/)
  .map(async (line) => {
    const [commit, ref] = line.split(/ /);
    const version = ref.replace('refs/tags/', '');
    const date = (await simpleGit().show(['-s', '--format=%cI', commit])).trim();
    return {
      version,
      date
    };
  }));

const findRelease = (date, releases) => {
  let closestRelease = null;
  let closestReleaseDate = null;
  for (const release of releases) {
    if (release.date >= date && (closestReleaseDate === null || release.date < closestReleaseDate)) {
      closestRelease = release;
      closestReleaseDate = release.date;
    }
  }
  return closestRelease;
}

const iconChanged = async (iconName) => {
  if (!(iconName in releaseCache)) {
    return true;
  }
  const svgCommits = await simpleGit().log(path.join(ICONS_DIR, `${iconName}.svg`));
  if (releaseCache[iconName].date < svgCommits.latest.date) {
    return true;
  }
  const jsonCommits = await simpleGit().log(path.join(ICONS_DIR, `${iconName}.svg`));
  if (releaseCache[iconName].date < jsonCommits.latest.date) {
    return true;
  }
  return false;
}

try {
  for (let iconName of Object.keys(icons)) {
    if (await iconChanged(iconName)) {
      console.log(`${iconName} has changed or is not cached, fetching release cache.`);
      await updateIconReleaseCache(iconName, releases);
    } else {
      console.log(`${iconName} is up to date.`);
    }
    fs.writeFileSync(
      releaseCachePath,
      JSON.stringify(releaseCache, null, 2)
    );
  }
} catch (error) {
  console.error(error);
} finally {
  console.log('Writing current state to cache file.')
  fs.writeFileSync(
    releaseCachePath,
    JSON.stringify(releaseCache, null, 2)
  );
}
