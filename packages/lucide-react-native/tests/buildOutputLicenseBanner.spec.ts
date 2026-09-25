import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Guards against https://github.com/lucide-icons/lucide/issues/3744: with `preserveModules: true`,
// every icon tree-shakes into its own output chunk (~1,800 per format), and rollup-plugin-license
// has no option to limit its banner to entry chunks, so it used to duplicate the license comment
// into every single one of them. The build now injects the banner via Rollup's own `output.banner`
// function, filtered on `chunk.isEntry`, so only the two entry points per format should carry it.
const DIST_DIR = resolve(__dirname, '../dist');

const ENTRY_FILES = [
  'cjs/lucide-react-native.js',
  'cjs/icons/index.js',
  'esm/lucide-react-native.mjs',
  'esm/icons/index.mjs',
];

// A sample of tree-shaken icon chunks, representative of the ~1,800 non-entry chunks that must
// not carry their own copy of the banner.
const NON_ENTRY_SAMPLE_FILES = ['cjs/icons/a-arrow-down.js', 'esm/icons/a-arrow-down.mjs'];

const countLicenseOccurrences = (content: string) => (content.match(/@license/g) ?? []).length;

describe('lucide-react-native build output license banner', () => {
  it.each(ENTRY_FILES)('emits exactly one license banner in %s', (path) => {
    const content = readFileSync(resolve(DIST_DIR, path), 'utf-8');
    expect(countLicenseOccurrences(content)).toBe(1);
  });

  it.each(NON_ENTRY_SAMPLE_FILES)(
    'does not duplicate the license banner into non-entry chunk %s',
    (path) => {
      const content = readFileSync(resolve(DIST_DIR, path), 'utf-8');
      expect(countLicenseOccurrences(content)).toBe(0);
    },
  );
});
