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

const getIconNamesAtTag = async (tag: string) => {
  // --full-tree resolves `icons/` from the repo root instead of the cwd (docs/)
  const files = await git.raw(['ls-tree', '--full-tree', '--name-only', tag, 'icons/']);

  return new Set(
    files
      .split('\n')
      .filter((file) => file.endsWith('.svg'))
      .map((file) => path.basename(file, '.svg')),
  );
};

const tags = await fetchAllReleases();
const forkIconNames = await getIconNamesAtTag(tags[0]);
const releasedIconNames = await getIconNamesAtTag(tags[tags.length - 1]);

interface IconFile {
  status: string;
  file: string;
  renamedFile?: string;
}

const getAliasesAtTag = async (tag: string, iconName: string): Promise<string[]> => {
  try {
    const { aliases = [] } = JSON.parse(await git.show([`${tag}:icons/${iconName}.json`]));

    return aliases.map((alias) => (typeof alias === 'string' ? alias : alias.name));
  } catch {
    return [];
  }
};

// Git pairs removed and added files by content similarity, which also matches unrelated
// icons. Only trust unchanged files, and pair the rest by the aliases they had at that tag.
const resolveRenames = async (tag: string, iconFiles: IconFile[]) => {
  const removedIconNames = new Set<string>();
  const addedIconNames: string[] = [];
  const resolvedFiles: IconFile[] = [];

  iconFiles.forEach((iconFile) => {
    const { status, file, renamedFile } = iconFile;

    if (!file.endsWith('.svg') || status === 'R100' || !['A', 'R'].includes(status[0])) {
      resolvedFiles.push(iconFile);
      return;
    }

    if (status.startsWith('R')) {
      removedIconNames.add(path.basename(file, '.svg'));
    }

    addedIconNames.push(path.basename(renamedFile ?? file, '.svg'));
  });

  for (const iconName of addedIconNames) {
    const aliases = await getAliasesAtTag(tag, iconName);
    const previousIconName = aliases.find((alias) => removedIconNames.has(alias));

    if (previousIconName) {
      removedIconNames.delete(previousIconName);
      resolvedFiles.push({
        status: 'R',
        file: `icons/${previousIconName}.svg`,
        renamedFile: `icons/${iconName}.svg`,
      });
    } else {
      resolvedFiles.push({ status: 'A', file: `icons/${iconName}.svg` });
    }
  }

  return resolvedFiles;
};

const comparisonsPromises = tags.map(async (tag, index) => {
  const previousTag = tags[index - 1];

  if (!previousTag) return undefined;

  // Limit the diff to icons/ so files moved in from elsewhere (e.g. lab/) show up as
  // additions instead of renames from a path outside icons/
  const diff = await git.diff([
    '--name-status',
    '--oneline',
    previousTag,
    tag,
    '--',
    ':(top)icons/',
  ]);
  const files: IconFile[] = diff.split('\n').map((line) => {
    const [status, file, renamedFile] = line.split('\t');

    return { status, file, renamedFile };
  });

  const iconFiles = await resolveRenames(
    tag,
    files.filter(({ file }) => file != null && file.startsWith('icons/')),
  );
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

// Icon names that exist since the fork, including the names they were renamed to
const forkOriginIconNames = new Set(forkIconNames);

const comparisons = (await Promise.all(comparisonsPromises)).filter((comparison) => comparison != null && Object.keys(comparison.iconFiles).length > 0);
const newReleaseMetaData = {};

comparisons.forEach(({ tag, iconFiles, date }) => {
  if (tag == null) return;

  iconFiles.forEach(({ status, file, renamedFile }) => {
    if (file.endsWith('.json')) return;

    const version = tag.replace('v', '');
    const iconName = path.basename(file, '.svg');

    if (iconName === 'chromium') {
      console.log({ status, file, renamedFile });
    }

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

      if (forkOriginIconNames.has(iconName)) {
        forkOriginIconNames.add(renamedIconName);
      }

      // Keep the release the icon was created in under its new name
      if (newReleaseMetaData[iconName].createdRelease) {
        newReleaseMetaData[renamedIconName].createdRelease =
          newReleaseMetaData[iconName].createdRelease;
      }
    }

    if (status === 'A') {
      if (
        'changedRelease' in newReleaseMetaData[iconName] &&
        !allowedIconNameWithDoubleRelease.includes(iconName)
      ) {
        console.error(`Icon '${iconName}' has already changedRelease set.`);
        return;
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

      const metaData = await fs.promises.readFile(path.join(ICONS_DIR, iconJsonFile), 'utf-8');
      const iconMetaData = JSON.parse(metaData);
      const aliases = iconMetaData.aliases ?? [];

      const fromFork = [iconName, ...aliases.map((alias) => alias.name)].some((name) =>
        forkOriginIconNames.has(name),
      );
      const awaitingRelease = !releasedIconNames.has(iconName);

      if (!(iconName in newReleaseMetaData) && !fromFork && !awaitingRelease) {
        console.error(`Could not find release metadata for icon '${iconName}'.`);
      }

      const contents = {
        fromFork,
        awaitingRelease,
        ...defaultReleaseMetaData,
        ...(newReleaseMetaData[iconName] ?? {}),
      };

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
