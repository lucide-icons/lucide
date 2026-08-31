# Lucide Icon Usage Estimator

Run with:

```sh
pnpm icon-usage trash trash-2
```

The default is a bounded first pass over `lucide-react`, with two GitHub search pages and up to 200 candidate files validated per query slice. Use `--all-packages` to include every supported package, or `--thorough` for the previous broader limits of 10 pages and 1,000 candidate files per query slice.

GitHub code search requires authentication, so set `GITHUB_TOKEN` or pass `--token-env <NAME>`.

Use `--verbose` or `-v` to print detailed progress logs to stderr, including queries, pages, cache hits, retries, content validation, and matches.

## Method

The script uses GitHub REST `GET /search/code` with package-scoped, code-extension-scoped queries, then fetches each returned file and validates common Lucide import styles before counting a repository. Counts are deduplicated by `owner/repository`.

Output includes overall repository counts and per-package statistics. Per-package statistics are computed from validated matches for that package, so a repository using `trash` via `lucide-react` and `trash-2` via another package is represented correctly in both the overall totals and each package section.

Supported packages are `lucide-react`, `@lucide/vue`, `@lucide/svelte`, `@lucide/angular`, `@lucide/astro`, `lucide-preact`, `lucide-solid`, `lucide`, and `@lucide/lab`. The default package is `lucide-react` because all packages plus file-scope slicing is slow for broad icons; use `--all-packages` when that broader sample is needed.

Searches are split across relevant implementation file scopes using REST code search qualifiers such as `language:typescript`, `language:javascript`, `extension:vue`, and `extension:svelte`. Returned paths are still filtered by expected extensions before content is fetched, so Markdown and prompt/spec files are intentionally excluded by default because they frequently contain examples or generated implementation notes rather than live package usage.

By default, queries exclude forks, archived repositories, generated files, and vendored files using GitHub code search qualifiers. Use `--include-forks`, `--include-archived`, `--include-generated`, or `--include-vendored` to include them.

## GitHub API Limits

GitHub REST code search is authenticated and rate-limited to 10 requests per minute. Each query can return at most 1,000 results, with up to 100 results per page. Search only covers default branches and files smaller than 384 KB.

`total_count` and `incomplete_results` come from GitHub search and are recorded in JSON metadata. If a query exceeds the 1,000-result cap or returns `incomplete_results: true`, the script reports a warning and the result should be treated as incomplete rather than exhaustive.

GitHub's newer code search syntax is usable for public code search queries and supports qualifiers such as `NOT is:fork`, `NOT is:archived`, `NOT is:generated`, and `NOT is:vendored`, but the documented REST code search endpoint remains capped for result retrieval.

## Practical Strategy For Broad Icons

For common icons that hit search caps, use the script output as lower-bound or sampled evidence. The most defensible follow-up is to narrow query slices and cite them separately, for example by package, language/path, or repository cohorts, while preserving the JSON metadata for every query performed.

## Known Biases

Only public GitHub repositories visible to the token are observable. Private repositories and consumers outside GitHub are absent. GitHub is not representative of every Lucide consumer. Framework/package usage can differ materially. GitHub indexing may be incomplete or delayed. Generated or vendored code can still create false positives when GitHub does not identify it. Very common icons may exceed GitHub search-result caps.
