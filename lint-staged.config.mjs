/**
 * @param {string[]} filenames
 * @returns {string}
 */
const filenamesToAjvOption = (filenames) => filenames.map((filename) => `-d ${filename}`).join(' ');

/** @satisfies {import('lint-staged').Config} */
const config = {
  'icons/*.svg': (filenames) => [
    'node ./scripts/optimizeStagedSvgs.mts',
    'node ./scripts/generateNextJSAliases.mts',
    `prettier --write ${filenames.join(' ')}`
  ],
  'icons/*.json': (filenames) => [
    `ajv --spec=draft2020 -s icon.schema.json ${filenamesToAjvOption(filenames)}`,
    `prettier --write ${filenames.join(' ')}`,
  ],
  'categories/*.json': (filenames) => [
    `ajv --spec=draft2020 -s category.schema.json ${filenamesToAjvOption(filenames)}`,
    `prettier --write ${filenames.join(' ')}`,
  ],
};

export default config;
