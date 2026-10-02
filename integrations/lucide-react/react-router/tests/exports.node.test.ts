import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

// The browser suite resolves lucide-react through Vite. These checks use Node's own resolver,
// which is what a server runtime sees, so the `exports` map is verified the way #2743 hit it.

const require = createRequire(import.meta.url);
const packageRoot = fileURLToPath(new URL('./', import.meta.resolve('lucide-react/package.json')));

const inPackage = (file: string) => {
  assert.ok(file.startsWith(packageRoot), `${file} is outside ${packageRoot}`);
  assert.ok(existsSync(file), `${file} does not exist`);
  return file.slice(packageRoot.length);
};

const resolveImport = (specifier: string) =>
  inPackage(fileURLToPath(import.meta.resolve(specifier)));
const resolveRequire = (specifier: string) => inPackage(require.resolve(specifier));

test('the root entry resolves to the CommonJS bundle for both import and require', () => {
  assert.equal(resolveImport('lucide-react'), 'dist/cjs/lucide-react.js');
  assert.equal(resolveRequire('lucide-react'), 'dist/cjs/lucide-react.js');
  assert.equal(resolveImport('lucide-react/icons'), 'dist/cjs/lucide-react.js');
  assert.equal(resolveRequire('lucide-react/icons'), 'dist/cjs/lucide-react.js');
});

test('a single icon resolves to its ESM module', () => {
  assert.equal(resolveImport('lucide-react/icons/camera'), 'dist/esm/icons/camera.mjs');
  assert.equal(resolveRequire('lucide-react/icons/camera'), 'dist/esm/icons/camera.mjs');
});

test('the dynamic entries resolve with and without an extension', () => {
  assert.equal(resolveImport('lucide-react/dynamic'), 'dynamic.mjs');
  assert.equal(resolveRequire('lucide-react/dynamic'), 'dynamic.js');
  assert.equal(resolveImport('lucide-react/dynamic.mjs'), 'dynamic.mjs');
  assert.equal(resolveImport('lucide-react/dynamic.js'), 'dynamic.js');
  assert.equal(resolveImport('lucide-react/dynamicIconImports'), 'dynamicIconImports.mjs');
  assert.equal(resolveImport('lucide-react/dynamicIconImports.mjs'), 'dynamicIconImports.mjs');
});

test('deep imports into dist and package.json keep resolving', () => {
  assert.equal(
    resolveImport('lucide-react/dist/esm/icons/camera.mjs'),
    'dist/esm/icons/camera.mjs',
  );
  assert.equal(resolveRequire('lucide-react/dist/cjs/lucide-react.js'), 'dist/cjs/lucide-react.js');
  assert.equal(resolveImport('lucide-react/package.json'), 'package.json');
});

test('the types entry is declaration-only', () => {
  assert.throws(() => import.meta.resolve('lucide-react/types'), {
    code: 'ERR_PACKAGE_PATH_NOT_EXPORTED',
  });
});

test('the resolved entries load and export icon components', async () => {
  const root = await import('lucide-react');
  const camera = await import('lucide-react/icons/camera');

  assert.equal(root.Camera.displayName, 'Camera');
  assert.equal(camera.default.displayName, 'Camera');
  assert.equal(require('lucide-react').Camera.displayName, 'Camera');
});
