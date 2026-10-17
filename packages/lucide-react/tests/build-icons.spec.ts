// @vitest-environment node

import { afterEach, expect, it } from 'vitest';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const fixtureDirectories: string[] = [];

afterEach(() => {
  fixtureDirectories.splice(0).forEach((directory) => {
    rmSync(directory, { recursive: true, force: true });
  });
});

it('builds icons with templates and metadata in paths containing URL characters', () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'lucide-build-icons #%-'));
  fixtureDirectories.push(directory);
  const input = path.join(directory, 'input');
  const output = path.join(directory, 'output');
  const template = path.join(directory, 'template.mjs');
  mkdirSync(input);
  writeFileSync(
    path.join(input, 'sample.svg'),
    '<svg xmlns="http://www.w3.org/2000/svg"><path d="M1 1h2" /></svg>',
  );
  writeFileSync(path.join(input, 'sample.json'), JSON.stringify({ aliases: ['sample-alias'] }));
  writeFileSync(
    template,
    'export default ({ iconData }) => "export default " + JSON.stringify(iconData);',
  );

  const cli = fileURLToPath(new URL('../../../tools/build-icons/cli.ts', import.meta.url));
  const result = spawnSync(
    process.execPath,
    [
      cli,
      `--input=${input}`,
      `--output=${output}`,
      `--templateSrc=${template}`,
      '--pretty=false',
      '--silent',
    ],
    { encoding: 'utf8', timeout: 30_000 },
  );

  expect(result.error).toBeUndefined();
  expect(result.status).toBe(0);
  expect(result.stderr).toBe('');
  const generatedIcon = readFileSync(path.join(output, 'icons', 'sample.js'), 'utf8');
  expect(JSON.parse(generatedIcon.replace(/^export default /, ''))).toMatchObject({
    name: 'sample',
    aliases: ['sample-alias'],
    node: [['path', { d: 'M1 1h2' }]],
  });
  expect(readFileSync(path.join(output, 'icons', 'index.js'), 'utf8')).toContain('sample');
});
