# Lucide Icon Usage Estimator

Run with:

```sh
pnpm icon-usage trash trash-2
```

The default is a bounded first pass over `lucide-react`, with two GitHub search pages and up to 200 candidate files validated per query slice. Use `--all-packages` to include every supported package, or `--thorough` for the previous broader limits of 10 pages and 1,000 candidate files per query slice.

GitHub code search requires authentication, so set `GITHUB_TOKEN` or pass `--token-env <NAME>`.

Use `--verbose` or `-v` to print detailed progress logs to stderr, including queries, pages, cache hits, retries, content validation, and matches.

You can pass a single icon, and icon names may be kebab-case (`trash-2`) or export names (`Trash2`, `Trash2Icon`, `LucideTrash2`). Use `--icons-file <path>` to read names from a file with one name per line, such as a list of `lucide-react` exports.

## Usage In Context

```sh
pnpm icon-usage trash-2 --context
pnpm icon-usage trash-2 --describe
pnpm icon-usage --icons-file exports.txt --describe --max-contexts 30
```

`--context` extracts how each icon is used in every validated file: what kind of usage it is (a JSX/template element, a prop such as `icon={Trash2}`, a config object such as `{ title: 'Settings', icon: Settings }`, or a `data-lucide` attribute), the parent elements (for example `DropdownMenuItem` or `Button`), the enclosing component, label text (`aria-label`, `title`, visible text, i18n keys like `t('actions.delete')`), event handlers, links, and a short code snippet. Each usage gets a heuristic description such as `Trash2 in <DropdownMenuItem> labelled "Delete Project" within NavProjects`. Each icon gets a summary of the most common labels, parents and handlers, plus example links to the exact lines on GitHub.

`--describe` does the same, then sends the collected contexts to an OpenAI model (`OPENAI_API_KEY` required; `--model` or `OPENAI_MODEL` selects the model, `gpt-5-mini` by default). The model groups them into 1 to 4 use cases per icon. Each has a `useCase` array of 1 to 3 phrases for the `use-cases` field in `icons/*.json`, written following the "Use Cases" section of `.github/instructions/metadata.instructions.md` (loaded into the prompt at runtime), a description of where the icon appears in the UI, its approximate share of the sample, and example links. The icon's existing `use-cases` are included in the prompt. Responses are cached in the cache directory.

Use `--output <file>` (or `-o`) to write the results per icon to a JSON file shaped as `{ [icon]: [...usage] }`. With `--describe`, each entry is a use case (`useCase`, `description`, `sampleShare`, `examples`). Without it, each entry is an individual usage (`description`, `repository`, `url`, `kind`, `parents`, `component`, `labels`, `handlers`, `links`). `--output` implies `--context`, and the normal terminal, `--json` or `--csv` output is still printed.

```sh
pnpm icon-usage --icons-file exports.txt --describe --output usage.json
```

To keep runs bounded, searching for an icon stops once `--max-contexts` contexts (default 40) are collected, and at most two contexts are taken from each repository. When the limit is hit, the repository counts for that icon are a lower bound, and a warning says so. JSON output includes every context per match under `repositories.*.matches[].contexts`, and per-icon summaries and descriptions under `usage`.

Context extraction uses heuristics, not a full parser. It works best for JSX (React, Preact, Solid), Vue, Svelte and Astro templates in the same file as the import. Angular templates in separate `.html` files are not fetched.

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

## Retries And Partial Results

GitHub requests that time out or fail temporarily (`408`, `429`, `5xx`, rate-limit `403`, network errors) are retried up to 6 times with backoff, honouring `Retry-After` and rate-limit reset headers. If a request still fails, that search slice or file is skipped with a warning instead of stopping the run. The OpenAI client used by `--describe` retries up to 5 times.

Every successful GitHub and OpenAI response is cached in the cache directory as soon as it arrives. If a run fails or is interrupted, running the same command again replays the cached responses without waiting, and only fetches what is missing.

With `--output`, each icon is finished (including `--describe`) before the next one starts, and the file is rewritten after every icon. An interrupted run therefore leaves a valid JSON file with every completed icon.

## Known Biases

Only public GitHub repositories visible to the token are observable. Private repositories and consumers outside GitHub are absent. GitHub is not representative of every Lucide consumer. Framework/package usage can differ materially. GitHub indexing may be incomplete or delayed. Generated or vendored code can still create false positives when GitHub does not identify it. Very common icons may exceed GitHub search-result caps.
