import { Octokit } from '@octokit/rest';

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { minifySvg } from '../tools/build-helpers/helpers.ts';

// Resolve repo paths relative to this script so they work no matter which
// directory the script is invoked from (the workflow runs it from the repo root).
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(scriptDir, '..');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const pullRequestNumber = Number(process.env.PULL_REQUEST_NUMBER);
const commitSha = process.env.COMMIT_SHA ?? 'HEAD';
const useFileSystem = process.env.USE_FILE_SYSTEM === 'true';
const dryRun = process.env.DRY_RUN === 'true';

const owner = 'lucide-icons';
const repo = 'lucide';

// Marker that lets `peter-evans/find-comment` recognise our own comment so we
// update it in place instead of stacking a new nag on every PR edit. It must
// stay distinct from the `### Added or changed icons` marker used by the icon
// preview bot, or the two workflows would overwrite each other.
const COMMENT_MARKER = '<!-- lucide-missing-issue-comment -->';
const COMMENT_FILE = 'missing-issue-comment.md';
const ICON_NAME_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const GH_ICON_BASE_URL = 'https://lucide.dev/api/gh-icon';
const STUDIO_BASE_URL = 'https://studio.lucide.dev/edit';
const ISSUE_TEMPLATE = '01_icon_request.yml';

type Action = 'nag' | 'resolve' | 'none';

// Only these two fields of a pull request file entry are used. `octokit.paginate`
// is avoided in favour of a plain page loop because
// `@octokit/plugin-paginate-rest` and `@octokit/plugin-rest-endpoint-methods`
// resolve to different `@octokit/types` versions (9.3.2 and 10.0.0), which makes
// `paginate`'s overloads unresolvable.
type PullRequestFile = { filename: string; status: string };

if (!Number.isInteger(pullRequestNumber)) {
  console.error('PULL_REQUEST_NUMBER env variable is not a valid number');
  process.exit(1);
}

/** Reports back to the workflow which of the three comment steps should run. */
async function setAction(action: Action) {
  console.log(`action=${action}`);

  if (process.env.GITHUB_OUTPUT) {
    await fs.appendFile(process.env.GITHUB_OUTPUT, `action=${action}\n`);
  }
}

/**
 * Reads a file as it exists on the pull request's head commit, returning null
 * when it is not there. A fork's head commit is reachable from this repository
 * through `refs/pull/<number>/head`, so the fork is never checked out.
 *
 * Everything this returns is contributor-controlled, so callers must treat it
 * strictly as data.
 */
async function readPullRequestFile(filename: string) {
  if (useFileSystem) {
    try {
      return await fs.readFile(path.join(repoRoot, filename), 'utf-8');
    } catch {
      return null;
    }
  }

  try {
    // `repos.getContent` returns base64 in a JSON envelope. Reading the raw
    // url instead would hand back an ArrayBuffer for `image/svg+xml`.
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: filename,
      ref: commitSha,
    });

    if (Array.isArray(data) || data.type !== 'file' || data.content == null) return null;

    return Buffer.from(data.content, 'base64').toString('utf-8');
  } catch (error) {
    // A 404 means either no metadata file yet, or the fork force pushed past
    // the sha in the event payload.
    if ((error as { status?: number }).status === 404) return null;
    throw error;
  }
}

/**
 * Pulls the `### Icon use case` section out of a pull request description, as
 * laid out by `.github/pull_request_template.md`. HTML comments are stripped
 * *after* matching so an untouched template — where the section contains
 * nothing but the instructional comment — yields an empty string rather than
 * pasting our own instructions into the new issue.
 */
function extractUseCasesFromDescription(pullRequestBody: string) {
  const match = pullRequestBody.match(
    /^#{2,4}[ \t]*Icon use cases?[ \t]*(?:<!--[\s\S]*?-->)?[ \t]*$([\s\S]*?)(?=^#{1,4}[ \t]|$(?![\s\S]))/im,
  );

  if (!match) return '';

  return match[1]
    .replace(/<!--[\s\S]*?-->/g, '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n');
}

/** Prefers the icon's own metadata, falling back to the PR description. */
function getUseCases(metadata: unknown, pullRequestBody: string) {
  const useCases =
    metadata != null && typeof metadata === 'object'
      ? (metadata as Record<string, unknown>)['use-cases']
      : undefined;

  if (Array.isArray(useCases)) {
    const entries = useCases.filter(
      (useCase): useCase is string => typeof useCase === 'string' && useCase.trim() !== '',
    );

    if (entries.length > 0) {
      return entries.map((useCase) => `- ${useCase.trim()}`).join('\n');
    }
  }

  return extractUseCasesFromDescription(pullRequestBody);
}

/**
 * Builds a link to the icon request form with every field pre-filled. Linking to
 * the form (rather than a free-form `?body=`) means GitHub applies the template's
 * `🙌 icon request` label and renders the `### Icon name` heading that
 * `close-issue-with-banned-phrases.yml` relies on.
 */
function buildIssueUrl(name: string, svgContent: string, useCases: string) {
  // The gh-icon API and Lucide Studio both want the bare icon children, so drop
  // the `<svg>` wrapper. One base64 encoding then serves the preview image and
  // the studio link, matching `docs/.vitepress/theme/components/icons/IconPreview.vue`.
  const innerSvg = minifySvg(svgContent).replace(/<svg[^>]*>|<\/svg>/g, '');
  const base64 = Buffer.from(innerSvg).toString('base64');

  const studioUrl = `${STUDIO_BASE_URL}?value=${encodeURIComponent(base64)}&name=${name}&utm_source=github.com&utm_medium=pr-comment`;
  const designIdeas = `<a title="Open lucide studio" target="_blank" href="${studioUrl}"><img alt="${name}" width="200px" src="${GH_ICON_BASE_URL}/${base64}.svg"/><br/>Open lucide studio</a>`;

  // `URLSearchParams` is deliberate: it escapes the literal `+` and `(` `)`
  // characters that appear in base64 and in use cases, where `encodeURI` would
  // leave `+` to be decoded back into a space and corrupt the payload, and a
  // stray `)` would end the markdown link early.
  const params = new URLSearchParams({
    template: ISSUE_TEMPLATE,
    title: `${name} Icon Design`,
    name,
    'use-cases': useCases,
    'design-ideas': designIdeas,
  });

  // Spaces are serialised as `+`, which only decodes back to a space under
  // form decoding. `%20` means a space under both that and plain url decoding,
  // so the link cannot be misread whichever way GitHub parses it.
  const query = params.toString().replaceAll('+', '%20');

  return `https://github.com/${owner}/${repo}/issues/new?${query}`;
}

const { data: pullRequest } = await octokit.pulls.get({
  owner,
  repo,
  pull_number: pullRequestNumber,
});

const pullRequestBody = pullRequest.body ?? '';

// `closingIssuesReferences` covers both `closes #123` keywords in the description
// and issues linked by hand through the Development sidebar. A bare `#123`
// mention deliberately does not count as a link.
const { repository } = await octokit.graphql<{
  repository: { pullRequest: { closingIssuesReferences: { totalCount: number } } };
}>(
  `query ($owner: String!, $repo: String!, $number: Int!) {
     repository(owner: $owner, name: $repo) {
       pullRequest(number: $number) {
         closingIssuesReferences(first: 1) {
           totalCount
         }
       }
     }
   }`,
  { owner, repo, number: pullRequestNumber },
);

if (repository.pullRequest.closingIssuesReferences.totalCount > 0) {
  console.log(`Pull request #${pullRequestNumber} references an issue.`);
  await setAction('resolve');
  process.exit(0);
}

const files: PullRequestFile[] = [];

// A pull request adding a family of icons can hold well over a hundred files,
// and `listFiles` pages at a hundred at a time.
for (let page = 1; ; page += 1) {
  const { data } = await octokit.pulls.listFiles({
    owner,
    repo,
    pull_number: pullRequestNumber,
    per_page: 100,
    page,
  });

  files.push(...data);

  if (data.length < 100) break;
}

// An icon that leaves `lab/` in the same pull request is being promoted out of
// the lab rather than designed from scratch, so it already had its discussion.
const promotedLabIcons = new Set(
  files
    .filter((file) => file.status === 'removed' && /^lab\/[^/]+\.svg$/.test(file.filename))
    .map((file) => path.basename(file.filename, '.svg')),
);

// Only brand new icons need a design issue; redesigns of existing icons already
// have one, and renames are not new designs. Sorted so re-runs of the same pull
// request produce an identical comment instead of reshuffling the links.
const addedIcons = files
  .filter(
    (file) =>
      file.status === 'added' &&
      /^icons\/[^/]+\.svg$/.test(file.filename) &&
      !promotedLabIcons.has(path.basename(file.filename, '.svg')),
  )
  .sort((a, b) => a.filename.localeCompare(b.filename));

if (addedIcons.length === 0) {
  console.log('No added icons found');
  await setAction('none');
  process.exit(0);
}

const issueLinks = (
  await Promise.all(
    addedIcons.map(async ({ filename }) => {
      const name = path.basename(filename, '.svg');

      // The filename comes from a fork and ends up rendered in our comment, so
      // anything that is not a plain icon slug is skipped rather than trusted.
      if (!ICON_NAME_PATTERN.test(name)) {
        console.log(`Skipping "${filename}": not a valid icon name.`);
        return null;
      }

      const svgContent = await readPullRequestFile(filename);

      if (svgContent == null) {
        console.log(`Could not read ${filename}. Skipping.`);
        return null;
      }

      const metadataContent = await readPullRequestFile(`icons/${name}.json`);
      let metadata: unknown;

      if (metadataContent != null) {
        try {
          metadata = JSON.parse(metadataContent);
        } catch {
          // A malformed metadata file is `lint:json:icons`' problem, not ours.
          console.log(`Could not parse icons/${name}.json. Falling back to the PR description.`);
        }
      }

      const useCases = getUseCases(metadata, pullRequestBody);
      const issueUrl = buildIssueUrl(name, svgContent, useCases);

      return `[Create an issue for the \`${name}\` icon](${issueUrl})`;
    }),
  )
).filter((link): link is string => link !== null);

if (issueLinks.length === 0) {
  console.log('No valid added icons found');
  await setAction('none');
  process.exit(0);
}

const linkList = issueLinks.map((link) => `- ${link}`).join('\n');

// A pull request adding a whole icon family would otherwise bury the message
// under a wall of links, so collapse the list at the same threshold
// `generateChangedIconsCommentMarkup.mts` uses to switch layout.
const callToAction =
  issueLinks.length === 1
    ? `Click here to create an issue for this design: ${issueLinks[0]}`
    : issueLinks.length < 8
      ? `Click here to create an issue for these designs:\n${linkList}`
      : `<details>
<summary>Click here to create an issue for each of these ${issueLinks.length} designs</summary>

${linkList}

</details>`;

const commentMarkup = `${COMMENT_MARKER}
It looks like your PR for a new icon design does not reference an issue.

Please create an issue for the design discussion. And reference it in the PR.

${callToAction}

Thank you for your contribution!
`;

if (dryRun) {
  console.log(commentMarkup);
} else {
  await fs.writeFile(path.join(process.cwd(), COMMENT_FILE), commentMarkup);
}

await setAction('nag');
