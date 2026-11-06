// Fails the build when an `icons/*` subpath has type declarations but no runtime file.
import { existsSync, readdirSync } from 'node:fs';

const declarations = readdirSync('dist/types/icons').filter((file) => file.endsWith('.d.ts'));

const missing = declarations.flatMap((file) => {
  const name = file.replace(/\.d\.ts$/, '');
  return [`dist/esm/icons/${name}.mjs`, `dist/cjs/icons/${name}.js`].filter(
    (runtimeFile) => !existsSync(runtimeFile),
  );
});

if (missing.length > 0) {
  console.error(`Missing runtime files for icon subpaths:\n${missing.join('\n')}`);
  process.exit(1);
}
