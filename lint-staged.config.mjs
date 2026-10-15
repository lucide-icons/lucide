/** @satisfies {import('lint-staged').Config} */
const config = {
  'icons/*.svg': (filenames) => [
    'node ./scripts/optimizeStagedSvgs.mts',
    'node ./scripts/generateNextJSAliases.mts',
    `prettier --write ${filenames.join(' ')}`,
  ],
  'icons/*.json': (filenames) => [
    `eslint ${filenames.join(' ')}`,
    `cspell --no-progress ${filenames.join(' ')}`,
    `prettier --write ${filenames.join(' ')}`,
  ],
  'categories/*.json': (filenames) => [
    `eslint ${filenames.join(' ')}`,
    `cspell --no-progress ${filenames.join(' ')}`,
    `prettier --write ${filenames.join(' ')}`,
  ],
};

export default config;
