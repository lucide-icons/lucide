/**
 * Generates a conventional-commit PR title from the paths a pull request changes.
 *
 * Because merges in this repository are squashed, the PR title becomes the
 * commit message and the changelog entry. This script generates the whole title
 * for icon contributions and, for every other kind of PR, inserts or updates the
 * conventional-commit scope so `lint-pr-title` is satisfied.
 *
 * It follows the convention of `generateChangedIconsCommentMarkup.mts`: it reads
 * its input from the environment, prints the result to stdout and has no other
 * side effects. It only imports Node built-ins and the shared
 * `conventional-commit-types.json` (a native JSON import), so Node can still run
 * it natively as an `.mts` file without a `pnpm install` step.
 *
 * Env input (CLI wrapper at the bottom):
 * - `ADDED_FILES_FILE`: path to a newline-separated list of added files, or
 * - `ADDED_FILES`: a space-separated list of added files (handy for local runs).
 * - `CHANGED_FILES_FILE` / `CHANGED_FILES`: the same for all changed files
 *   (added, modified, renamed and deleted).
 * - `CURRENT_TITLE`: the current PR title.
 *
 * Output: the new title on stdout, or nothing at all when no change is needed.
 */

import { readFileSync } from 'node:fs';

// Single source of truth for the conventional-commit types, shared with
// `lint-pr-title` (amannn/action-semantic-pull-request).
import VALID_TYPES from '../.github/conventional-commit-types.json' with { type: 'json' };

// Default type used in prefix mode when the current title has no valid type.
// The path reliably tells us the scope but nothing about whether a change is a
// feat/fix/chore, so we fall back to the most neutral type.
const DEFAULT_TYPE = 'chore';

// How many icon names to list in a generated title before summarising the rest.
const MAX_NAMES = 3;

// How many package scopes to join with `|` before falling back to `packages`.
const MAX_SCOPES = 3;
const PACKAGES_SCOPE = 'packages';

/**
 * - `icon`: an added file *is* the subject, so the whole title is generated.
 *   Changed (not added) icon files only provide a scope.
 * - `package`: a package in `packages/`, scoped by its `package.json` name.
 * - `repo`: any other area of the repository.
 */
type Kind = 'icon' | 'package' | 'repo';

type Rule = {
  pattern: RegExp;
  scope: string;
  kind: Kind;
};

/**
 * Path -> scope rules. Each file is matched by the *first* rule in this list
 * that matches it, and scopes are listed in the order of this list, which keeps
 * the outcome deterministic. The `icons`, `lab`, `metadata`, `docs` and `site`
 * scopes mirror `.github/labeler.yml`; `packages/*` scopes mirror each
 * package's `package.json` name.
 */
const RULES: Rule[] = [
  { pattern: /^icons\/[^/]+\.svg$/, scope: 'icons', kind: 'icon' },
  { pattern: /^lab\/[^/]+\.svg$/, scope: 'lab', kind: 'icon' },
  { pattern: /^packages\/lucide-react-native\//, scope: 'lucide-react-native', kind: 'package' },
  { pattern: /^packages\/lucide-react\//, scope: 'lucide-react', kind: 'package' },
  { pattern: /^packages\/lucide-preact\//, scope: 'lucide-preact', kind: 'package' },
  { pattern: /^packages\/lucide-solid\//, scope: 'lucide-solid', kind: 'package' },
  { pattern: /^packages\/lucide-static\//, scope: 'lucide-static', kind: 'package' },
  { pattern: /^packages\/icons\//, scope: '@lucide/icons', kind: 'package' },
  { pattern: /^packages\/vue\//, scope: '@lucide/vue', kind: 'package' },
  { pattern: /^packages\/angular\//, scope: '@lucide/angular', kind: 'package' },
  { pattern: /^packages\/svelte\//, scope: '@lucide/svelte', kind: 'package' },
  { pattern: /^packages\/solid\//, scope: '@lucide/solid', kind: 'package' },
  { pattern: /^packages\/astro\//, scope: '@lucide/astro', kind: 'package' },
  { pattern: /^packages\/lab\//, scope: '@lucide/lab', kind: 'package' },
  { pattern: /^packages\/shared\//, scope: '@lucide/shared', kind: 'package' },
  { pattern: /^packages\/lucide\//, scope: 'lucide', kind: 'package' },
  { pattern: /^(?:icons|categories)\/[^/]+\.json$/, scope: 'metadata', kind: 'repo' },
  { pattern: /^docs\/.*\.md$/, scope: 'docs', kind: 'repo' },
  { pattern: /^docs\//, scope: 'site', kind: 'repo' },
];

/**
 * Every scope this script can produce. A title whose scope consists only of
 * these is owned by the script and may be updated; any other scope was chosen
 * by a person and is kept.
 */
const GENERATED_SCOPES = new Set([...RULES.map((rule) => rule.scope), PACKAGES_SCOPE]);

/**
 * Formats a list of icon names into the subject of a generated title, e.g.
 * `` `heart` icon ``, `` `heart`, `heart-off` icons `` or
 * `` `a`, `b`, `c` and 2 more icons ``.
 */
const formatIconNames = (names: string[]): string => {
  const quoted = names.map((name) => `\`${name}\``);
  const noun = names.length === 1 ? 'icon' : 'icons';

  if (quoted.length <= MAX_NAMES) {
    return `${quoted.join(', ')} ${noun}`;
  }

  const shown = quoted.slice(0, MAX_NAMES).join(', ');
  const remaining = quoted.length - MAX_NAMES;
  return `${shown} and ${remaining} more ${noun}`;
};

/**
 * Builds the whole title for an icon rule from the added files matching it.
 * Names are deduped by basename (an icon PR adds both `heart.svg` and
 * `heart.json`) and kept in the order they first appear.
 */
const generateTitle = (scope: string, matchedFiles: string[]): string => {
  const names = matchedFiles
    .map((file) => file.replace(/^.*\//, '').replace(/\.[^.]+$/, ''))
    .filter((name, index, all) => all.indexOf(name) === index);

  return `feat(${scope}): added ${formatIconNames(names)}`;
};

/**
 * Derives the scope from the changed files. Package scopes win over icon
 * scopes, which win over any other scope (an icon change usually touches its
 * metadata too). Multiple scopes are joined with `|`, e.g.
 * `lucide-react|@lucide/vue`, and more than `MAX_SCOPES` packages are
 * summarised as `packages`.
 */
const resolveScope = (changedFiles: string[]): string | null => {
  const matchedRules = new Set(
    changedFiles
      .map((file) => RULES.find((rule) => rule.pattern.test(file)))
      .filter((rule) => rule != null),
  );
  const scopesOf = (kind: Kind) =>
    RULES.filter((rule) => rule.kind === kind && matchedRules.has(rule)).map((rule) => rule.scope);

  const packageScopes = scopesOf('package');
  if (packageScopes.length > MAX_SCOPES) return PACKAGES_SCOPE;
  if (packageScopes.length > 0) return packageScopes.join('|');

  for (const kind of ['icon', 'repo'] as const) {
    const scopes = scopesOf(kind);
    if (scopes.length > 0) return scopes.join('|');
  }

  return null;
};

const isGeneratedScope = (scope: string): boolean =>
  scope.split('|').every((part) => GENERATED_SCOPES.has(part.trim()));

/**
 * Rewrites the current title around the resolved scope: the contributor's own
 * type and subject are preserved and the title is normalised to
 * `type(scope)!: subject`. A scope chosen by a person is kept; a missing scope or
 * one this script generated earlier is replaced by `scope`. When the title has
 * no valid type, `DEFAULT_TYPE` is used. When there is no subject or no scope to
 * work with, `null` is returned so the title is left untouched.
 */
const prefixTitle = (scope: string | null, currentTitle: string): string | null => {
  const match = currentTitle.match(/^\s*(\w+)\s*(?:\(([^)]*)\))?\s*(!?)\s*:\s*(.*)$/);
  const type = match?.[1].toLowerCase();

  if (match && type != null && VALID_TYPES.includes(type)) {
    const [, , currentScope = '', breaking, subject] = match;
    if (subject.trim() === '') return null;

    const keepScope =
      currentScope.trim() !== '' && (scope == null || !isGeneratedScope(currentScope));
    const newScope = keepScope ? currentScope.trim() : scope;
    if (newScope == null) return null;

    return `${type}(${newScope})${breaking}: ${subject.trim()}`;
  }

  const subject = currentTitle.trim();
  if (scope == null || subject === '') return null;
  return `${DEFAULT_TYPE}(${scope}): ${subject}`;
};

type PullRequestFiles = {
  addedFiles: string[];
  changedFiles: string[];
};

/**
 * Pure title function: given the added and changed files and the current
 * title, returns the new title, or `null` when nothing should change (no
 * matching rule, no subject to work with, or the title is already correct).
 */
export const generatePullRequestTitle = (
  { addedFiles, changedFiles }: PullRequestFiles,
  currentTitle: string,
): string | null => {
  const iconRule = RULES.find(
    (rule) => rule.kind === 'icon' && addedFiles.some((file) => rule.pattern.test(file)),
  );

  // Added files are changed files too, also when only `ADDED_FILES` is given.
  const allChangedFiles = [...new Set([...addedFiles, ...changedFiles])];

  const newTitle =
    iconRule != null
      ? generateTitle(
          iconRule.scope,
          addedFiles.filter((file) => iconRule.pattern.test(file)),
        )
      : prefixTitle(resolveScope(allChangedFiles), currentTitle);

  if (newTitle == null || newTitle === currentTitle) return null;

  return newTitle;
};

// --- CLI wrapper -----------------------------------------------------------
// Only runs when executed directly, keeping the function above unit-testable.

const readFileList = (filePath: string | undefined, list: string | undefined): string[] => {
  const raw = filePath != null && filePath !== '' ? readFileSync(filePath, 'utf-8') : (list ?? '');

  return raw
    .split(/\s+/)
    .map((file) => file.trim())
    .filter((file) => file !== '');
};

if (import.meta.main) {
  const { ADDED_FILES_FILE, ADDED_FILES, CHANGED_FILES_FILE, CHANGED_FILES, CURRENT_TITLE } =
    process.env;

  const newTitle = generatePullRequestTitle(
    {
      addedFiles: readFileList(ADDED_FILES_FILE, ADDED_FILES),
      changedFiles: readFileList(CHANGED_FILES_FILE, CHANGED_FILES),
    },
    CURRENT_TITLE ?? '',
  );

  if (newTitle != null) {
    process.stdout.write(newTitle);
  }
}
