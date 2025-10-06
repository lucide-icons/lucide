/* eslint-disable no-restricted-syntax,  no-await-in-loop */
import fs from 'fs';
import path from 'path';
import { simpleGit } from 'simple-git';
import semver from 'semver';
import { readSvgDirectory } from '@lucide/helpers';

const DATE_OF_FORK = '2020-06-08T16:39:52+0100';

const git = simpleGit();

const currentDir = process.cwd();
const ICONS_DIR = path.resolve(currentDir, '../icons');
const iconJsonFiles = await readSvgDirectory(ICONS_DIR, '.json');
const location = path.resolve(currentDir, '.vitepress/data', 'releaseMetaData.json');
const releaseMetaDataDirectory = path.resolve(currentDir, '.vitepress/data', 'releaseMetadata');

const allowedIconNameWithDoubleRelease = ['slash'];

if (fs.existsSync(location)) {
  fs.unlinkSync(location);
}

if (fs.existsSync(releaseMetaDataDirectory)) {
  fs.rmSync(releaseMetaDataDirectory, { recursive: true, force: true });
}

if (!fs.existsSync(releaseMetaDataDirectory)) {
  fs.mkdirSync(releaseMetaDataDirectory);
}

const fetchAllReleases = async () => {
  await git.fetch('https://github.com/lucide-icons/lucide.git', '--tags');

  return Promise.all(
    (await git.tag(['-l']))
      .trim()
      .split(/\n/)
      .filter((tag) => semver.valid(tag))
      .sort(semver.compare),
  );
};

const tags = await fetchAllReleases();

const comparisonsPromises = tags.map(async (tag, index) => {
  const previousTag = tags[index - 1];

  if (!previousTag) return undefined;

  const diff = await git.diff(['--name-status', '--oneline', previousTag, tag]);
  const files = diff.split('\n').map((line) => {
    const [status, file, renamedFile] = line.split('\t');

    return { status, file, renamedFile };
  });

  const iconFiles = files.filter(({ file }) => file != null && file.startsWith('icons/'));
  let date = (await git.show(['-s', '--format=%cI', tag])).trim();

  // Fallback to dat of fork if date is not valid
  if (!date.startsWith('20')) {
    date = DATE_OF_FORK;
  }

  return {
    tag,
    date,
    iconFiles,
  };
});

const comparisons = await Promise.all(comparisonsPromises);
const newReleaseMetaData = {};

comparisons.forEach(({ tag, iconFiles, date } = {}) => {
  if (tag == null) return;

  iconFiles.forEach(({ status, file, renamedFile }) => {
    if (file.endsWith('.json')) return;

    const version = tag.replace('v', '');
    const iconName = path.basename(file, '.svg');

    if (newReleaseMetaData[iconName] == null) newReleaseMetaData[iconName] = {};

    const releaseData = {
      version,
      date,
    };

    if (status.startsWith('R')) {
      // Make sure set the old one as well
      newReleaseMetaData[iconName].changedRelease = {
        version,
        date,
      };

      const renamedIconName = path.basename(renamedFile, '.svg');

      if (newReleaseMetaData[renamedIconName] == null) {
        newReleaseMetaData[renamedIconName] = {};
      }

      newReleaseMetaData[renamedIconName].changedRelease = {
        version,
        date,
      };
    }

    if (status === 'A') {
      if (
        'changedRelease' in newReleaseMetaData[iconName] &&
        !allowedIconNameWithDoubleRelease.includes(iconName)
      ) {
        throw new Error(`Icon '${iconName}' has already changedRelease set.`);
      }

      newReleaseMetaData[iconName].createdRelease = releaseData;
      newReleaseMetaData[iconName].changedRelease = releaseData;
    }
    if (status === 'M') {
      newReleaseMetaData[iconName].changedRelease = {
        version,
        date,
      };
    }
  });
});

const defaultReleaseMetaData = {
  createdRelease: {
    version: '0.0.0',
    date: DATE_OF_FORK,
  },
  changedRelease: {
    version: '0.0.0',
    date: DATE_OF_FORK,
  },
};

try {
  const releaseMetaData = await Promise.all(
    iconJsonFiles.map(async (iconJsonFile) => {
      const iconName = path.basename(iconJsonFile, '.json');
      const metaDir = path.resolve(releaseMetaDataDirectory, `${iconName}.json`);

      if (!(iconName in newReleaseMetaData)) {
        console.error(`Could not find release metadata for icon '${iconName}'.`);
      }

      const contents = {
        ...defaultReleaseMetaData,
        ...(newReleaseMetaData[iconName] ?? {}),
      };

      const metaData = await fs.promises.readFile(path.join(ICONS_DIR, iconJsonFile), 'utf-8');
      const iconMetaData = JSON.parse(metaData);
      const aliases = iconMetaData.aliases ?? [];

      if (aliases.length) {
        aliases.forEach((alias) => {
          if (!(alias.name in newReleaseMetaData)) {
            return;
          }

          contents.createdRelease =
            newReleaseMetaData[alias.name].createdRelease ?? defaultReleaseMetaData.createdRelease;
        });
      }

      const output = JSON.stringify(contents, null, 2);
      await fs.promises.writeFile(metaDir, output, 'utf-8');

      return [iconName, contents];
    }),
  );
  await fs.promises.writeFile(
    location,
    JSON.stringify(Object.fromEntries(releaseMetaData), null, 2),
    'utf-8',
  );

  console.log('Successfully written icon release meta files');
} catch (error) {
  throw new Error(`Something went wrong generating icon release meta cache file,\n ${error}`);
}
