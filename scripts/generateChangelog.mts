import getArgumentOptions from 'minimist';
import githubApi from './githubApi.mts';

const fetchCompareTags = (oldTag: string) =>
  githubApi(`https://api.github.com/repos/lucide-icons/lucide/compare/${oldTag}...main`);

const iconRegex = /icons\/(.*)\.svg/g;
const iconTemplate = ({ name, pullNumber, author }: { name: string, pullNumber: number, author: string }) =>
  `- \`${name}\` (${pullNumber}) by @${author}`;

const topics = [
  {
    title: 'New icons 🎨',
    template: iconTemplate,
    filter: ({ status, filename }) => status === 'added' && filename.match(iconRegex),
  },
  {
    title: 'Modified Icons 🔨',
    template: iconTemplate,
    filter: ({ status, filename }) => status === 'modified' && filename.match(iconRegex),
  },
  {
    title: 'Code improvements ⚡',
    template: ({ title, pullNumber, author }) => `- ${title} (${pullNumber}) by @${author}`,
    filter: ({ filename }, index, self) =>
      !filename.match(iconRegex) && self.indexOf(filename) === index,
  },
];

const fetchCommits = async (file) => {
  const commits = await githubApi(
    `https://api.github.com/repos/lucide-icons/lucide/commits?path=${file.filename}`,
  );

  return { ...file, commits };
};

const cliArguments = getArgumentOptions(process.argv.slice(2));

// eslint-disable-next-line func-names
(async function () {
  try {
    const output = await fetchCompareTags(cliArguments['old-tag']);

    if (output?.files == null) {
      throw new Error('Tag not found!');
    }

    const changedFiles = output.files.filter(
      ({ filename }: { filename: string }) => !filename.match(/docs\/(.*)|(.*)package\.json|tags.json/g),
    );

    const commits = await Promise.all(changedFiles.map(fetchCommits));

    if (!commits.length) {
      throw new Error('No commits found');
    }

    const mappedCommits = commits
      .map(({ commits: [pr], filename, sha, status }) => {
        const pullNumber = /(.*)\((#[0-9]*)\)/gm.exec(pr.commit.message);
        const nameRegex = /^\/?(.+\/)*(.+)\.(.+)$/g.exec(filename);

        if (!pr.author) {
          // Most likely bot commit
          return null;
        }

        return {
          filename,
          name: nameRegex && nameRegex[2] ? nameRegex[2] : null,
          title: pullNumber && pullNumber[1] ? pullNumber[1].trim() : null,
          pullNumber: pullNumber && pullNumber[2] ? pullNumber[2].trim() : null,
          author: pr.author?.login || 'unknown',
          sha,
          status,
        };
      })
      .filter((commit): commit is NonNullable<typeof commit> => Boolean(commit))
      .filter(({ pullNumber }) => !!pullNumber);

    const changelog = topics.map(({ title, filter, template }) => {
      const lines = mappedCommits.filter(filter).map<string>(template);

      if (lines.length) {
        return [`## ${title}`, ' ', ...lines, ' '];
      }

      return [''];
    });

    const changelogMarkown = changelog.flat().join('\n');

    console.log(changelogMarkown);
  } catch (error) {
    throw new Error(error);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
