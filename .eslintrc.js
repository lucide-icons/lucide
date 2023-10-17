const requiredSVGAttrs = Object.entries({
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
}).map(([attr, value]) => ({
  tag: 'svg',
  attr,
  value: String(value),
}));

module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['import', 'prettier', '@html-eslint'],
  rules: {
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.js', '**/*.spec.js', './scripts/**'] },
    ],
    'import/extensions': [
      'error',
      {
        pattern: {
          mjs: 'always',
          json: 'always',
        },
      },
    ],

    // SVG Specific
    '@html-eslint/require-doctype': 'off',
    '@html-eslint/no-duplicate-attrs': 'error',
    '@html-eslint/no-inline-styles': 'error',
    '@html-eslint/require-attrs': ['error', ...requiredSVGAttrs],
    '@html-eslint/indent': ['error', 2],
    '@html-eslint/no-extra-spacing-attrs': [
      'error',
      {
        enforceBeforeSelfClose: true,
      },
    ],
    '@html-eslint/require-closing-tags': [
      'error',
      {
        selfClosing: 'always',
        allowSelfClosingCustom: true,
      },
    ],
    '@html-eslint/element-newline': 'error',
    '@html-eslint/no-multiple-empty-lines': 'error',
    '@html-eslint/no-trailing-spaces': 'error',
    '@html-eslint/quotes': 'error',
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./site/tsconfig.json', './packages/*/tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.svg'],
      parser: '@html-eslint/parser',
    },
  ],
};
