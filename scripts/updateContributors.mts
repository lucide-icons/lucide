import fs from 'node:fs';
import path from 'path';
import simpleGit from 'simple-git';
import { Octokit } from '@octokit/rest';
import pMemoize from 'p-memoize';

const IGNORED_COMMITS = ['433bbae4f1d4abb50a26306d6679a38ace5c8b78'];
const FETCH_DEPTH = process.env.FETCH_DEPTH || 1000;

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const git = simpleGit();

const cache = new Map();

const getUserName = pMemoize(
  async (commit) => {
    const { data: fetchedCommit } = await octokit.repos.getCommit({
      owner: 'lucide-icons',
      repo: 'lucide',
      ref: commit.hash,
    });
    if (!fetchedCommit?.author?.login) {
      console.error(`Could not find author name for ${commit.author_email}`);
    }
    return fetchedCommit?.author?.login;
  },
  { cacheKey: ([commit]) => commit.author_email, cache },
);

// Check that a commit changes more than just the icon name
const isCommitRelevant = async (hash: string, file: string) => {
  const summary = await git.diffSummary(['--diff-filter=AM', `${hash}~1`, hash]);
  return summary.files.some(({ file: name }) => name === file);
};

const getContributors = async (file: string, includeCoAuthors?: boolean) => {
  const { all } = await git.log([`HEAD~${FETCH_DEPTH}..`, '--', file]);
  const commits = file.endsWith('.svg')
    ? (
        await Promise.all(all.map(async (commit) => await isCommitRelevant(commit.hash, file) && commit))
      ).filter(Boolean)
    : all;

  const emails = new Map();
  for (let i = commits.length - 1; i >= 0; i -= 1) {
    const commit = commits[i];

    if(!commit || !commit.author_email) {
      console.warn(`Skipping commit without author email: ${JSON.stringify(commit)}`);
      continue;
    }

    if ("hash" in commit && !IGNORED_COMMITS.includes(commit.hash)) {
      if (!emails.has(commit.author_email)) {
        emails.set(commit.author_email, getUserName(commit));
      }
      if (includeCoAuthors) {
        const matches = commit.body.matchAll(
          /(^Author:|^Co-authored-by:)\s+(?<author>[^<]+)\s+<(?<email>[^>]+)>/gm,
        );
        // eslint-disable-next-line no-restricted-syntax
        for (const match of matches) {
          if (!emails.has(match.groups?.email) && cache.has(match.groups?.email)) {
            emails.set(match.groups?.email, Promise.resolve(cache.get(match.groups?.email)));
          }
        }
      }
    }
  }

  return Promise.all(Array.from(emails.values()));
};

const files = (process.env.CHANGED_FILES?.split(' ') ?? [])
  .map((file) => file.replace('.json', '.svg'))
  .filter((file, idx, arr) => arr.indexOf(file) === idx);

if (!files.every((file) => file.startsWith('icons/'))) {
  console.error("file path must start with 'icons/'");
  process.exit(1);
}

// get all contributors to be able to associate them when they are co authors
await getContributors('icons');

await Promise.all(
  files.map(async (file) => {
    const jsonFile = path.join(process.cwd(), file.replace('.svg', '.json'));
    const json = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
    const { tags, categories, aliases, contributors: previousContributors, ...rest } = json;
    const contributors = [
      ...(previousContributors || []),
      ...(await getContributors(file, true)),
    ].filter((contributor, idx, arr) => contributor && arr.indexOf(contributor) === idx);
    fs.writeFileSync(
      jsonFile,
      JSON.stringify(
        {
          $schema: '../icon.schema.json',
          contributors,
          aliases,
          tags,
          categories,
          ...rest,
        },
        null,
        2,
      ) + '\n',
    );
  }),
);
