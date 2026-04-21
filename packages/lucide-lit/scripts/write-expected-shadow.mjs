import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, '../tests/expectedShadowHtml.ts');

function stripAnsi(s) {
  return s.replace(/\x1b\[[0-9;]*m/g, '');
}

function escapeSingleQuotedJs(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function tsKey(k) {
  if (k === 'default') return 'default';
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k)) return k;
  return `'${k.replace(/'/g, "\\'")}'`;
}

let buf = '';
process.stdin.setEncoding('utf8');
for await (const chunk of process.stdin) {
  buf += chunk;
}
const text = stripAnsi(buf);
const start = text.indexOf('NORM_JSON_START');
const end = text.indexOf('NORM_JSON_END');
if (start === -1 || end === -1 || end <= start) {
  console.error('Could not find NORM_JSON_START / NORM_JSON_END in web-test-runner output.');
  process.exit(1);
}
const jsonStr = text.slice(start + 'NORM_JSON_START'.length, end).trim();
const data = JSON.parse(jsonStr);

const lines = ['const expectedShadowHtml: Record<string, string> = {'];
for (const [k, v] of Object.entries(data)) {
  lines.push(`  ${tsKey(k)}:`);
  lines.push(`    '${escapeSingleQuotedJs(v)}',`);
}
lines.push('};', '', 'export default expectedShadowHtml;', '');

fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
console.error(`Wrote ${outPath}`);
