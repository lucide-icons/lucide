/**
 * Checks formatting with Prettier and reports every unformatted range as a GitHub Actions
 * annotation (`::error file=…,line=…`), so it shows up inline in the PR diff.
 *
 * `prettier --check` only reports file names, so this formats each listed file in memory and
 * diffs it against the original to find the exact lines.
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import process from 'process';
import { spawnSync } from 'child_process';
import { createRequire } from 'module';
import * as prettier from 'prettier';

const PATTERNS = ['**/*.{js,mjs,ts,jsx,tsx,html,css,scss,json,yml,yaml}', 'icons/*.svg'];

const prettierBin = createRequire(import.meta.url).resolve('prettier/bin/prettier.cjs');

const listDifferent = spawnSync(
  process.execPath,
  [prettierBin, '--list-different', '--no-color', ...PATTERNS],
  { encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 },
);

/** Escape data for a workflow command, see https://github.com/actions/toolkit/blob/main/packages/core/src/command.ts */
const escapeData = (value: string) =>
  value.replaceAll('%', '%25').replaceAll('\r', '%0D').replaceAll('\n', '%0A');
const escapeProperty = (value: string) =>
  escapeData(value).replaceAll(':', '%3A').replaceAll(',', '%2C');

let problems = 0;

// Exit code 2 means Prettier could not process a file, e.g. because of a syntax error.
if (listDifferent.status !== 0 && listDifferent.status !== 1) {
  console.log('::group::Prettier errors');
  console.log(listDifferent.stderr);
  console.log('::endgroup::');

  const syntaxError = /^\[error\] (.+?): (\w*Error: .+) \((\d+):(\d+)\)$/;
  for (const line of listDifferent.stderr.split('\n')) {
    const match = line.match(syntaxError);
    if (!match) continue;
    const [, file, message, errorLine, column] = match;
    console.log(
      `::error file=${escapeProperty(file)},line=${errorLine},col=${column},title=Prettier::${escapeData(message)}`,
    );
    problems++;
  }

  if (problems === 0) {
    console.log(
      `::error title=Prettier::${escapeData(listDifferent.stderr.trim() || 'Prettier failed.')}`,
    );
    problems++;
  }
}

const files = listDifferent.stdout.split('\n').filter(Boolean);

if (files.length === 0 && problems === 0) {
  console.log('All matched files use Prettier code style!');
  process.exit(0);
}

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lint-format-'));
const hunkHeader = /^@@ -(\d+)(?:,(\d+))? \+\d+(?:,\d+)? @@/;

for (const file of files) {
  const source = fs.readFileSync(file, 'utf-8');
  const options = await prettier.resolveConfig(file);
  const formatted = await prettier.format(source, { ...options, filepath: file });

  const formattedFile = path.join(tmpDir, 'formatted');
  fs.writeFileSync(formattedFile, formatted);

  const { stdout: diff } = spawnSync(
    'git',
    ['diff', '--no-index', '--no-color', '-U0', '--', file, formattedFile],
    { encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 },
  );

  console.log(`::group::${file}`);
  console.log(diff);
  console.log('::endgroup::');

  const lines = diff.split('\n');
  for (let index = 0; index < lines.length; index++) {
    const match = lines[index].match(hunkHeader);
    if (!match) continue;

    const start = Number(match[1]);
    const count = match[2] === undefined ? 1 : Number(match[2]);

    const expected: string[] = [];
    while (index + 1 < lines.length && /^[-+\\ ]/.test(lines[index + 1])) {
      index++;
      if (lines[index].startsWith('+')) expected.push(lines[index].slice(1));
    }

    // A pure insertion (count 0) happens after `start`, so point at that line.
    const line = Math.max(start, 1);
    const endLine = count === 0 ? line : start + count - 1;

    const message =
      expected.length > 0
        ? `Code is not formatted with Prettier. Expected:\n${expected.join('\n')}`
        : 'Code is not formatted with Prettier. Remove these lines.';

    console.log(
      `::error file=${escapeProperty(file)},line=${line},endLine=${endLine},title=Prettier::${escapeData(message)}`,
    );
  }
}

fs.rmSync(tmpDir, { recursive: true, force: true });

if (files.length > 0) {
  console.log(
    `\n${files.length} file(s) not formatted with Prettier. Run \`pnpm lint:format-fix\` and \`pnpm lint:icons-fix\` to fix.`,
  );
}
process.exit(1);
