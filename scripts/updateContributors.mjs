import simpleGit from 'simple-git';
import {Octokit} from '@octokit/rest';
import fs from 'node:fs';
import path from 'path';
import simpleGit from 'simple-git';
import { Octokit } from '@octokit/rest';
import pMemoize from 'p-memoize';
import crypto from 'crypto';

const IGNORED_COMMITS = [
  '433bbae4f1d4abb50a26306d6679a38ace5c8b78',
  '6552a4cca1061c720684acf17da6dc6b46b2f9db',
  '0029e37e04085e266145659deb64266126b4e896',
  '7a17a2f343d39619573bc2cc49b45aba63421a05',
  '0029e37e04085e266145659deb64266126b4e896',
  '4cf85b29c1dc79a589261111b990803e77958a47',
  'a0b9d28209c77fc1ec83277df8a119d8473ccdbc'
];

const octokit = new Octokit({auth: process.env.GITHUB_TOKEN});

const emailCache = new Map();
const commitDiffCache = new Map();
const sha1Cache = new Map();

const git = simpleGit();

const emailMap = {
  'c8bca0b57c3a581ba3db73a7abd9c59e07b904af': 'ericfennis',
  'dfbf1749432f085fee3a34c7ee9ce45b514968cd': 'ericfennis',
  '8a10622c6202d2290fa44a79b2f0e0f7d5333b46': 'johnletey',
  '5a0cb472af3c9d5295b78f69d747825767c04ca5': 'ericfennis',
  'd64c4189b7dc521fcff4dfce2bf93cf69044172f': 'karsa-mistmere',
};

const getSha1Email = pMemoize(
  (email) => {
    return crypto.createHash('sha1').update(email).digest('hex');
  }, {
    cacheKey: email => email, sha1Cache
  }
);

const getUserName = pMemoize(
  async (commit) => {
    const {data: fetchedCommit} = await octokit.repos.getCommit({
      owner: 'lucide-icons',
      repo: 'lucide',
      ref: commit.hash,
    });
    if (!fetchedCommit?.author?.login) {
      const emailSha1 = await getSha1Email(commit.author_email);
      if (emailSha1 in emailMap) {
        return emailMap[emailSha1];
      } else {
        console.error(`Could not find author name for ${commit.author_email}`);
      }
    }
    return fetchedCommit?.author?.login;
  },
  {cacheKey: ([commit]) => commit.author_email, cache: emailCache}
);

const addToEmailMap = (map, email) => {
  if (!map.has(email)) {
    map.set(email, Promise.resolve(emailCache.get(email)));
  }
}

const optimizationRegex = /(optimi[sz][ea]|fix|simplif|refine|improve|update|minify)/i;

const addToEmailMaps = ({
                          designedBy,
                          optimizedBy,
                          metadataBy,
                          unknown
                        }, email, isMetadata, status, commit) => {
  if (isMetadata) {
    addToEmailMap(metadataBy, email);
  } else if (status?.startsWith('A')) {
    addToEmailMap(designedBy, email);
  } else if (commit.body.match(optimizationRegex) || commit.message.match(optimizationRegex)) {
    addToEmailMap(optimizedBy, email);
  } else {
    addToEmailMap(unknown, email);
  }
}

const getContributors = async (file, includeCoAuthors, isMetadata = false) => {
  const {all: commits} = await git.log(['--reverse', '--', file]);

  const contributorEmails = {
    designedBy: new Map(),
    metadataBy: new Map(),
    optimizedBy: new Map(),
    unknown: new Map(),
  }
  const emails = new Map();
  for (let i = commits.length - 1; i >= 0; i -= 1) {
    const commit = commits[i];
    let status, renamedFile;

    if (!IGNORED_COMMITS.includes(commit.hash)) {
      if (file === 'icons') {
        commitDiffCache.set(commit.hash, await git.show(['--name-status', commit.hash]));
        if (!emails.has(commit.author_email)) {
          emails.set(commit.author_email, getUserName(commit));
        }
      } else if (commitDiffCache.has(commit.hash)) {
        const diff = commitDiffCache.get(commit.hash)
          .split('\n')
          .filter(l => l.match(/^[RAM][0-9]*\t/))
          .map(l => l.split('\t'))
          .filter(([, diffFile]) => diffFile === file);
        if (diff.length === 1) {
          [status, , renamedFile] = diff[0];
        }
        addToEmailMaps(contributorEmails, commit.author_email, isMetadata, status, commit);

        if (includeCoAuthors && !isMetadata) {
          const matches = commit.body.matchAll(
            /(^Author:|^Co-authored-by:)\s+(?<author>[^<]+)\s+<(?<email>[^>]+)>/gm
          );
          // eslint-disable-next-line no-restricted-syntax
          for (const match of matches) {
            if (file !== 'icons') {
              addToEmailMaps(contributorEmails, match.groups.email, isMetadata, status, commit);
            }
          }
        }
      }
    }
  }

  if (file === 'icons') {
    return Promise.all(Array.from(emails.values()));
  } else {
    return new Promise(async (resolve) => {
      const acc = {};
      for (const role of Object.keys(contributorEmails)) {
        acc[role] = await Promise.all(Array.from(contributorEmails[role].values()));
      }
      resolve(acc);
    });
  }
}

const files = process.argv
  .slice(2)
  .reduce((acc, curr) => {
    if (curr === 'icons/*.svg') {
      acc.push(
        ...fs.readdirSync('icons')
          .filter(file => file.endsWith('.svg'))
          .map(file => `icons/${file}`)
      );
    } else if (curr === 'icons/*.json') {
      acc.push(
        ...fs.readdirSync('icons')
          .filter(file => file.endsWith('.json'))
          .map(file => `icons/${file}`)
      );
    } else {
      acc.push(curr);
    }
    return acc;
  }, [])
  .filter((file, idx, arr) => arr.indexOf(file) === idx)
;

if (!files.every((file) => file.startsWith('icons/'))) {
  console.error("file path must start with 'icons/'");
  process.exit(1);
}

// get all contributors to be able to associate them when they are co-authors
await getContributors('icons');

const mergeContributions = (...contributorMaps) => {
  return ['designedBy', 'metadataBy', 'optimizedBy', 'unknown']
    .reduce((acc, curr) => {
      acc[curr] = contributorMaps
        .reduce((acc2, curr2) => {
          acc2.push(...curr2[curr] ?? [])
          return acc2;
        }, [])
        .filter((contributor, idx, arr) => contributor && arr.indexOf(contributor) === idx);
      return acc;
    }, {});
}

await Promise.all(
  files.map(async (file) => {
    const jsonFile = file.replace(/(\.svg)$/, '.json');
    const jsonFilePath = path.join(process.cwd(), jsonFile);
    const json = JSON.parse(fs.readFileSync(jsonFile));
    const {tags, categories, aliases, contributors, ...rest} = json;
    const updatedContributors = mergeContributions(
      Array.isArray(contributors) ? {unknown: contributors} : contributors || {},
      await getContributors(file, true),
      await getContributors(jsonFile, true, true)
    );
    updatedContributors.unknown = updatedContributors.unknown.filter(name =>
      !updatedContributors.designedBy.includes(name) &&
      !updatedContributors.optimizedBy.includes(name) &&
      !updatedContributors.metadataBy.includes(name)
    );
    if (updatedContributors.unknown.length > 0) {
      console.log(`contributions of an unknown role were found for icon ${file}`, updatedContributors.unknown);
    }
    delete updatedContributors.unknown;
    fs.writeFileSync(
      jsonFilePath,
      JSON.stringify(
        {
          $schema: '../icon.schema.json',
          contributors: updatedContributors,
          aliases,
          tags,
          categories,
          ...rest,
        },
        null,
        2,
      ),
    );
  }),
);
