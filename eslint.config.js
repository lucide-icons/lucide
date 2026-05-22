import js from '@eslint/js';
import airbnbBase from 'eslint-config-airbnb-base';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import htmlEslint from '@html-eslint/eslint-plugin';
import htmlParser from '@html-eslint/parser';

const DEFAULT_ATTRS = (
  await import('./tools/build-icons/render/default-attrs.json', { assert: { type: 'json' } })
).default;

export default [
  {
    ignores: ['node_modules/', 'dist/'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        global: 'readonly',
        __dirname: 'readonly',
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...airbnbBase.rules,
      ...prettier.rules,
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
  },
  {
    files: ['./icons/*.svg'],
    languageOptions: {
      parser: htmlParser,
    },
    plugins: {
      '@html-eslint': htmlEslint,
    },
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
        },
      ],
      '@html-eslint/element-newline': 'error',
      '@html-eslint/no-trailing-spaces': 'error',
      '@html-eslint/quotes': 'error',
    },
  },
];
