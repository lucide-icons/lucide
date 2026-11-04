import path from "node:path";
import fs from "node:fs/promises";
import { type Octokit } from "@octokit/rest";
import { repoRoot } from './repository.mts';
import { type MetadataSuggestion } from './model.mts';

export type PullRequestParams = { owner: string; repo: string; pull_number: number };
export type SuggestionsCache = Record<string, MetadataSuggestion>;

// The model's suggestions per icon name are stored as hidden JSON in the body
// of each review, so later runs on the pull request only call the API for icons
// that don't have suggestions yet (e.g. new or renamed icons).
const CACHE_MARKER = /<!-- suggest-metadata-cache: (.*?) -->/;

export async function loadSuggestionsCache(
  octokit: Octokit,
  pullRequest: PullRequestParams,
  username: string,
) {
  const suggestionsCache: SuggestionsCache = {};
  const previousReviews = await octokit.paginate(octokit.pulls.listReviews, {
    ...pullRequest,
    per_page: 100,
  });
  for (const { user, body } of previousReviews) {
    const cache = user?.login === username ? body?.match(CACHE_MARKER)?.[1] : undefined;
    if (!cache) continue;

    try {
      // Entries from before markers were supported lack `groups` and
      // `extends`. They're left out so those icons are asked again; what they
      // suggested is still deduped through the earlier comments.
      const entries = Object.entries<Partial<MetadataSuggestion>>(JSON.parse(cache));
      for (const [iconName, suggestion] of entries) {
        if (suggestion?.groups && suggestion.extends !== undefined) {
          suggestionsCache[iconName] = suggestion as MetadataSuggestion;
        }
      }
    } catch {
      // Ignore a malformed cache.
    }
  }

  return suggestionsCache;
}

export function formatSuggestionsCache(suggestionsCache: SuggestionsCache) {
  return `<!-- suggest-metadata-cache: ${JSON.stringify(suggestionsCache).replaceAll('>', '\\u003e')} -->`;
}

// The action runs on every update of the pull request. Collect the values that
// were already suggested per file and field from the suggestion blocks of
// earlier comments, so they are not suggested again. Comparing values rather
// than whole comments keeps working when the surrounding array changes, e.g.
// after a contributor adds a tag or applies part of a suggestion.
export async function loadPreviousSuggestions(
  octokit: Octokit,
  pullRequest: PullRequestParams,
  username: string,
) {
  const previousComments = (
    await octokit.paginate(octokit.pulls.listReviewComments, {
      ...pullRequest,
      per_page: 100,
    })
  ).filter((comment) => comment.user?.login === username);

  const previouslySuggestedValues = new Map<string, string[]>();
  // Files and fields that still have a suggestion that can be applied. A second
  // one would replace overlapping lines, and applying both would break the JSON.
  const openSuggestions = new Set<string>();
  for (const { path: filePath, body, line: commentLine } of previousComments) {
    // Comments of the oldest format were posted without a closing fence, and
    // don't start with "Suggested `field`". Their suggestion starts with the
    // field's own line (e.g. `"tags": [`), so the field is read from there.
    const suggestion = body.match(/```suggestion\r?\n([\s\S]*?)(?:\r?\n```|$)/)?.[1];
    const field =
      body.match(/^Suggested `([^`]+)`/)?.[1] ?? suggestion?.match(/^\s*"([^"]+)":/)?.[1];
    if (!field || !suggestion) continue;

    const values = suggestion.split('\n').flatMap((line) => {
      const value = line.trim().match(/^("(?:[^"\\]|\\.)*"),?$/)?.[1];
      return value ? [JSON.parse(value) as string] : [];
    });

    const key = `${filePath}:${field}`;
    previouslySuggestedValues.set(key, [...(previouslySuggestedValues.get(key) ?? []), ...values]);

    // GitHub sets `line` to null once the commented lines have changed (outdated).
    if (commentLine != null) openSuggestions.add(key);
  }

  return { previouslySuggestedValues, openSuggestions };
}

export type PreviousSuggestions = Awaited<ReturnType<typeof loadPreviousSuggestions>>;

// Read files of the pull request at the reviewed commit, or from the local
// checkout when testing with `USE_FILE_SYSTEM`. The reader returns null when a
// file doesn't exist at that commit.
export function createFileReader({
  octokit,
  pullRequest,
  commitSha,
  useFileSystem,
}: {
  octokit: Octokit;
  pullRequest: PullRequestParams;
  commitSha: string;
  useFileSystem: boolean;
}) {
  return async function readPullRequestFile(filename: string): Promise<string | null> {
    if (useFileSystem) {
      return fs.readFile(path.join(repoRoot, filename), 'utf-8');
    }

    try {
      const { data } = await octokit.repos.getContent({
        owner: pullRequest.owner,
        repo: pullRequest.repo,
        path: filename,
        ref: commitSha,
        mediaType: { format: 'raw' },
      });
      return data as unknown as string;
    } catch (error) {
      // The file list is for the latest head, so a file can be missing at
      // the reviewed commit (added later, or removed). A later run covers it.
      if ((error as { status?: number }).status !== 404) throw error;
      console.log(`${filename} does not exist at ${commitSha}. Skipping...`);
      return null;
    }
  };
}
