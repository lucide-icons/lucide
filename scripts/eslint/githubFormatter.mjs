import path from 'node:path';

/**
 * ESLint formatter for GitHub Actions. Prints each problem as a readable line plus a workflow
 * command (`::error file=…`), so it shows up as an inline annotation in the PR diff.
 *
 * Unlike setup-node's `eslint-stylish` problem matcher, this also annotates parsing errors, which
 * have no rule id.
 *
 * Usage: eslint --format ./scripts/eslint/githubFormatter.mjs
 */

/** Escape data for a workflow command, see https://github.com/actions/toolkit/blob/main/packages/core/src/command.ts */
const escapeData = (/** @type {string} */ value) =>
  value.replaceAll('%', '%25').replaceAll('\r', '%0D').replaceAll('\n', '%0A');
const escapeProperty = (/** @type {string} */ value) =>
  escapeData(value).replaceAll(':', '%3A').replaceAll(',', '%2C');

/** @type {import('eslint').ESLint.FormatterFunction} */
const formatter = (results) => {
  const lines = [];
  let errors = 0;
  let warnings = 0;

  for (const result of results) {
    const file = path.relative(process.cwd(), result.filePath);

    for (const message of result.messages) {
      const severity = message.severity === 2 ? 'error' : 'warning';
      if (severity === 'error') errors++;
      else warnings++;

      const rule = message.ruleId ?? 'parse';
      const line = message.line ?? 1;
      const column = message.column ?? 1;
      lines.push(`${file}:${line}:${column}  ${severity}  ${message.message}  (${rule})`);

      const properties = [
        `file=${escapeProperty(file)}`,
        `line=${line}`,
        `col=${column}`,
        message.endLine ? `endLine=${message.endLine}` : '',
        message.endColumn ? `endColumn=${message.endColumn}` : '',
        `title=${escapeProperty(`ESLint (${rule})`)}`,
      ].filter(Boolean);
      lines.push(`::${severity} ${properties.join(',')}::${escapeData(message.message)}`);
    }
  }

  if (errors + warnings > 0) {
    const plural = (/** @type {number} */ count, /** @type {string} */ word) =>
      `${count} ${word}${count === 1 ? '' : 's'}`;
    lines.push(
      '',
      `✖ ${plural(errors + warnings, 'problem')} (${plural(errors, 'error')}, ${plural(warnings, 'warning')})`,
    );
  }
  return lines.join('\n');
};

export default formatter;
