/**
 * Generates a conventional-commit PR title from the paths a pull request *adds*.
 *
 * Because merges in this repository are squashed, the PR title becomes the
 * commit message, and `ci.yml` only triggers an icon release when that message
 * starts with `feat(icons)`. This script derives a release-triggering title for
 * icon contributions and, for every other kind of PR, at least corrects the
 * conventional-commit scope so `lint-pr-title.yml` is satisfied.
 *
 * It follows the convention of `generateChangedIconsCommentMarkup.mts`: it reads
 * its input from the environment, prints the result to stdout and has no other
 * side effects. Its only import is the shared `conventional-commit-types.json`
 * (a native JSON import, no third-party dependency), so Node can still run it
 * natively as an `.mts` file without a `pnpm install` step.
 *
 * Env input (CLI wrapper at the bottom):
 * - `ADDED_FILES_FILE`: path to a newline-separated list of added files, or
 * - `ADDED_FILES`: a space-separated list of added files (handy for local runs).
 * - `CURRENT_TITLE`: the current PR title.
 *
 * Output: the new title on stdout, or nothing at all when no change is needed.
 */

// Single source of truth for the conventional-commit types, shared with
// `lint-pr-title.yml` (amannn/action-semantic-pull-request).
import VALID_TYPES from '../.github/conventional-commit-types.json' with { type: 'json' };

// Default type used in prefix mode when the current title has no valid type.
// The path reliably tells us the scope but nothing about whether a change is a
// feat/fix/chore, so we fall back to the most neutral type.
const DEFAULT_TYPE = 'chore';

// How many icon names to list in a generated title before summarising the rest.
const MAX_NAMES = 3;

type Mode = 'generate' | 'prefix';

type Rule = {
  pattern: RegExp;
  scope: string;
  mode: Mode;
};

/**
 * Ordered path -> scope rules. The winning rule is the *first* one in this list
 * that matches at least one added file, which keeps the outcome deterministic.
 *
 * `icons/` and `lab/` come first because their added filename *is* the subject,
 * so the whole title is generated. Every other rule only corrects the scope.
 * Scope names mirror `.github/labeler.yml`.
 */
const RULES: Rule[] = [
  { pattern: /^icons\/[^/]+\.svg$/, scope: 'icons', mode: 'generate' },
  { pattern: /^lab\/[^/]+\.svg$/, scope: 'lab', mode: 'generate' },
  { pattern: /^icons\/[^/]+\.json$/, scope: 'icons', mode: 'prefix' },
  { pattern: /^categories\/[^/]+\.json$/, scope: 'categories', mode: 'prefix' },
  { pattern: /^docs\/.*\.md$/, scope: 'docs', mode: 'prefix' },
  { pattern: /^docs\//, scope: 'site', mode: 'prefix' },
  { pattern: /^packages\/lucide-react-native\//, scope: 'react-native', mode: 'prefix' },
  { pattern: /^packages\/lucide-react\//, scope: 'react', mode: 'prefix' },
  { pattern: /^packages\/lucide-preact\//, scope: 'preact', mode: 'prefix' },
  { pattern: /^packages\/lucide-solid\//, scope: 'solid', mode: 'prefix' },
  { pattern: /^packages\/lucide-static\//, scope: 'static', mode: 'prefix' },
  { pattern: /^packages\/lucide-icons\//, scope: 'lucide-icons', mode: 'prefix' },
  { pattern: /^packages\/vue\//, scope: 'vue', mode: 'prefix' },
  { pattern: /^packages\/angular\//, scope: 'angular', mode: 'prefix' },
  { pattern: /^packages\/svelte\//, scope: 'svelte', mode: 'prefix' },
  { pattern: /^packages\/astro\//, scope: 'astro', mode: 'prefix' },
  { pattern: /^packages\/lucide\//, scope: 'lucide', mode: 'prefix' },
];

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
 * Builds the whole title for a generate-mode rule from the added files matching
 * it. Names are deduped by basename (an icon PR adds both `heart.svg` and
 * `heart.json`) and kept in the order they first appear.
 */
const generateTitle = (scope: string, matchedFiles: string[]): string => {
  const names = matchedFiles
    .map((file) => file.replace(/^.*\//, '').replace(/\.[^.]+$/, ''))
    .filter((name, index, all) => all.indexOf(name) === index);

  return `feat(${scope}): added ${formatIconNames(names)}`;
};

/**
 * Rewrites the current title for a prefix-mode rule: the contributor's own type
 * and subject are preserved and only the scope is inserted or corrected. When
 * the title has no valid type, `DEFAULT_TYPE` is used. When the title has no
 * subject at all, `null` is returned so the title is left untouched.
 */
const prefixTitle = (scope: string, currentTitle: string): string | null => {
  const match = currentTitle.match(/^(\w+)(?:\([^)]*\))?(!?):\s*(.*)$/);

  if (match && VALID_TYPES.includes(match[1])) {
    const [, type, breaking, subject] = match;
    if (subject.trim() === '') return null;
    return `${type}(${scope})${breaking}: ${subject}`;
  }

  const subject = currentTitle.trim();
  if (subject === '') return null;
  return `${DEFAULT_TYPE}(${scope}): ${subject}`;
};

/**
 * Pure title function: given the list of added files and the current title,
 * returns the new title, or `null` when nothing should change (no added files,
 * no matching rule, no subject to work with, or the title is already correct).
 */
export const generatePullRequestTitle = (
  addedFiles: string[],
  currentTitle: string,
): string | null => {
  const rule = RULES.find((candidate) => addedFiles.some((file) => candidate.pattern.test(file)));

  if (rule == null) return null;

  const newTitle =
    rule.mode === 'generate'
      ? generateTitle(
          rule.scope,
          addedFiles.filter((file) => rule.pattern.test(file)),
        )
      : prefixTitle(rule.scope, currentTitle);

  if (newTitle == null || newTitle === currentTitle) return null;

  return newTitle;
};

// --- CLI wrapper -----------------------------------------------------------
// Only runs when executed directly, keeping the function above unit-testable.

if (import.meta.url === `file://${process.argv[1]}`) {
  const { ADDED_FILES_FILE, ADDED_FILES, CURRENT_TITLE } = process.env;

  let rawFiles = '';
  if (ADDED_FILES_FILE != null && ADDED_FILES_FILE !== '') {
    const fs = await import('node:fs');
    rawFiles = fs.readFileSync(ADDED_FILES_FILE, 'utf-8');
  } else if (ADDED_FILES != null) {
    rawFiles = ADDED_FILES;
  }

  const addedFiles = rawFiles
    .split(/\s+/)
    .map((file) => file.trim())
    .filter((file) => file !== '');

  const newTitle = generatePullRequestTitle(addedFiles, CURRENT_TITLE ?? '');

  if (newTitle != null) {
    process.stdout.write(newTitle);
  }
}
