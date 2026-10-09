/**
 * Spell checks icon and category metadata with cspell and reports every unknown word as a GitHub
 * Actions annotation (`::error file=…,line=…`), so it shows up inline in the PR diff.
 *
 * Words that are correct but unknown to cspell go in `.cspell/custom-words.txt`.
 */
import process from 'process';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const PATTERNS = ['icons/*.json', 'categories/*.json'];

// cspell only exports its bin for `import`, so resolve it the ESM way.
const cspellBin = fileURLToPath(import.meta.resolve('cspell/bin.mjs'));

const cspell = spawnSync(
  process.execPath,
  [cspellBin, '--no-color', '--no-progress', '--no-summary', ...PATTERNS],
  { encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 },
);

/** Escape data for a workflow command, see https://github.com/actions/toolkit/blob/main/packages/core/src/command.ts */
const escapeData = (value: string) =>
  value.replaceAll('%', '%25').replaceAll('\r', '%0D').replaceAll('\n', '%0A');
const escapeProperty = (value: string) =>
  escapeData(value).replaceAll(':', '%3A').replaceAll(',', '%2C');

const issue = /^(.+?):(\d+):(\d+) - Unknown word \((.+?)\)(?: fix: \((.+?)\))?/;
let problems = 0;

for (const line of cspell.stdout.split('\n')) {
  const match = line.match(issue);
  if (!match) continue;

  const [, file, lineNumber, column, word, fix] = match;
  const suggestion = fix ? ` Did you mean "${fix}"?` : '';
  const message = `Unknown word "${word}".${suggestion} Fix the typo or add the word to .cspell/custom-words.txt.`;

  console.log(line);
  console.log(
    `::error file=${escapeProperty(file)},line=${lineNumber},col=${column},endColumn=${Number(column) + word.length},title=cspell::${escapeData(message)}`,
  );
  problems++;
}

if (cspell.status !== 0 && problems === 0) {
  process.stderr.write(cspell.stderr);
  console.log(`::error title=cspell::${escapeData(cspell.stderr.trim() || 'cspell failed.')}`);
  process.exit(cspell.status ?? 1);
}

if (problems > 0) {
  console.log(`\n${problems} spelling issue(s) found.`);
  process.exit(1);
}

console.log('No spelling issues found.');
