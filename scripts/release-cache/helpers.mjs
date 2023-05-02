
import semver from 'semver';

export const releaseCachePath = 'icon-releases.json';

export const semverMin = (a, b) => {
  if (!a || !semver.valid(a)) return b;
  if (!b || !semver.valid(b)) return a;
  return semver.gt(a, b) ? b : a;
}

export const semverMax = (a, b) => {
  if (!a || !semver.valid(a)) return b;
  if (!b || !semver.valid(b)) return a;
  return semver.gt(a, b) ? a : b;
}

export const maxDate = (a, b) => {
  if (!a) return new Date(b).toISOString();
  if (!b) return new Date(a).toISOString();
  if (!a && !b) return null;
  const aDate = new Date(a).toISOString();
  const bDate = new Date(b).toISOString();
  return aDate > bDate ? aDate : bDate;
}

export const updateReleaseCacheWithCommit = (cache, icon, version) => {
  cache[icon.name] = cache[icon.name] || {};
  cache[icon.name].contributors = cache[icon.name].contributors || [];
  if (icon.author && !cache[icon.name].contributors.includes(icon.author)) {
    cache[icon.name].contributors.push(icon.author);
  }
  if (version) {
    cache[icon.name].createdRelease = semverMin(cache[icon.name].createdRelease, version);
    cache[icon.name].changedRelease = semverMax(cache[icon.name].changedRelease, version);
  }
  cache[icon.name].changed = maxDate(cache[icon.name].changed, icon.date);
}
