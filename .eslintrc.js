const DEFAULT_ATTRS = require('./tools/build-icons/render/default-attrs.json');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['import', '@html-eslint'],
  rules: {
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.js', '**/*.spec.js', '**/scripts/**'],
      },
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
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./docs/tsconfig.json', './packages/*/tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['./icons/*.svg'],
      parser: '@html-eslint/parser',
      rules: {
        '@html-eslint/require-doctype': 'off',
        '@html-eslint/no-duplicate-attrs': 'error',
        '@html-eslint/no-inline-styles': 'error',
        '@html-eslint/require-attrs': [
          'error',
          ...Object.entries(DEFAULT_ATTRS).map(([attr, value]) => ({
            tag: 'svg',
            attr,
            value: String(value),
          })),
        ],
        '@html-eslint/indent': ['error', 2],
        '@html-eslint/no-multiple-empty-lines': ['error', { max: 0 }],
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
        '@html-eslint/no-trailing-spaces': 'error',
        '@html-eslint/quotes': 'error',
      },
    },
  ],
};
