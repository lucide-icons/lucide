import githubApi from './githubApi.mjs';
import fs from 'fs';
import path from 'path';
import {getCurrentDirPath, readAllMetadata} from "./helpers.mjs";
import {CleanOptions, simpleGit} from 'simple-git';
import {releaseCachePath, updateReleaseCacheWithCommit} from "./release-cache/helpers.mjs";

const currentDir = getCurrentDirPath(import.meta.url);
const ICONS_DIR = path.resolve(currentDir, '../icons');
const icons = readAllMetadata(ICONS_DIR);

const fetchCommits = async (file) => {
  const commits = await githubApi(
    `https://api.github.com/repos/lucide-icons/lucide/commits?path=${file.filename}`,
  );
  if (Array.isArray(commits)) {
    return {...file, commits};
  } else {
    throw new Error();
  }
};

let releaseCache = {};
if (fs.existsSync(releaseCachePath)) {
  releaseCache = JSON.parse(fs.readFileSync(releaseCachePath));
}

const updateIconReleaseCache = async (iconName, releases) => {
  const {commits} = await fetchCommits({filename: `icons/${iconName}.svg`});
  for (let commit of commits) {
    const release = findRelease(commit.commit?.author?.date, releases);
    updateReleaseCacheWithCommit(releaseCache, {
      name: iconName,
      author: commit.author?.login,
      date: commit.commit?.author?.date
    }, release.version);
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

const latestCommitDate = async (fileName) => {
  try {
    return new Date((await simpleGit().raw('log', '--format=%cI', path.join(ICONS_DIR, fileName)))
      .trim().split(/\n/).at(0)).toISOString();
  } catch (e) {
    return null;
  }
}
const iconChanged = async (iconName) => {
  if (!(iconName in releaseCache)) {
    return true;
  }
  if (!releaseCache[iconName].changed) {
    return true;
  }
  const latestSvgCommitDate = await latestCommitDate(`${iconName}.svg`);
  if (releaseCache[iconName].changed < latestSvgCommitDate) {
    console.log(releaseCache[iconName].changed, latestSvgCommitDate);
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
