import path from 'node:path';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import importX, { createNodeResolver } from 'eslint-plugin-import-x';
import defaultAttrs from './tools/build-icons/render/default-attrs.json' with { type: 'json' };
import tseslint from 'typescript-eslint';
import jsonSchema from './scripts/eslint/jsonSchemaPlugin.mjs';
import svg from './scripts/eslint/svgPlugin/index.mjs';
import * as jsoncParser from 'jsonc-eslint-parser';

const gitignorePath = path.join(import.meta.dirname, '.gitignore');

// The elements an icon may be drawn with, and the attributes each of them may have. Keep this in
// sync with the `removeAttrs` list in prettier-plugin-lucide-svg.mjs, which strips everything else.
const shapeAttrs = {
  path: ['d'],
  line: ['x1', 'y1', 'x2', 'y2'],
  polygon: ['points'],
  polyline: ['points'],
  circle: ['cx', 'cy', 'r', 'fill'],
  ellipse: ['cx', 'cy', 'rx', 'ry'],
  rect: ['x', 'y', 'width', 'height', 'rx', 'ry'],
};

export default defineConfig([
  tseslint.configs.recommended,
  {
    // `packages/angular` has its own config with its own tsconfig, so a single `eslint .` run sees
    // two candidate roots and typescript-eslint refuses to guess between them.
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // Everything git ignores (generated icon sources, build output, caches) is ignored here too.
  includeIgnoreFile(gitignorePath),
  {
    // Ignores that are not in .gitignore, because these files are committed.
    ignores: [
      'lib',
      '**/tests',
      'packages/**/tests/*',
      'docs/images',
      'docs/**/examples/',
      'docs/.vitepress/theme/components/editors/preact/index.js',
      'packages/svelte/.svelte-kit',
      'integrations/**/file-routes.d.ts',
      // Tracked in git despite matching a .gitignore pattern, so lint it.
      '!packages/lucide-react/dynamicIconImports.mjs',
    ],
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
      'import-x': importX,
    },
    settings: {
      'import-x/resolver-next': [createNodeResolver()],
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettier.rules,
      'no-console': 'off',
      'no-param-reassign': 'off',
      'no-shadow': 'off',
      'no-use-before-define': 'off',
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.js',
            '**/*.spec.js',
            '**/scripts/**',
            'eslint.config.js',
            'packages/**/tests/**',
          ],
        },
      ],
      'import-x/extensions': [
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
    rules: {
      // Omitting a property by destructuring it away (`const { key, ...attrs } = node`) leaves the
      // omitted binding unused on purpose, so don't report it.
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    },
  },
  {
    files: ['./icons/*.svg'],
    languageOptions: {
      parser: svg.parser,
    },
    plugins: {
      svg,
    },
    rules: {
      // What an icon may contain, see docs/contribute/icons/code-conventions.md. How it is
      // formatted is checked by Prettier, see prettier-plugin-lucide-svg.mjs.
      'svg/no-text': 'error',
      'svg/allowed-elements': ['error', { root: 'svg', children: Object.keys(shapeAttrs) }],
      'svg/allowed-attrs': ['error', { svg: Object.keys(defaultAttrs), ...shapeAttrs }],
      'svg/require-attrs': ['error', { svg: defaultAttrs }],
      'svg/allowed-attr-values': [
        'error',
        {
          attrs: ['fill', 'stroke'],
          values: ['none', 'currentColor'],
          message:
            'Icons must inherit their colors: `fill` and `stroke` may only be `none` or `currentColor`.',
        },
      ],
    },
  },
  {
    files: ['icons/*.json', 'categories/*.json', 'groups/*.json'],
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: {
      'json-schema': jsonSchema,
    },
  },
  {
    files: ['icons/*.json'],
    rules: {
      'json-schema/no-invalid': ['error', { schema: 'icon.schema.json' }],
    },
  },
  {
    files: ['categories/*.json'],
    rules: {
      'json-schema/no-invalid': ['error', { schema: 'category.schema.json' }],
    },
  },
  {
    files: ['groups/*.json'],
    rules: {
      'json-schema/no-invalid': ['error', { schema: 'group.schema.json' }],
    },
  },
]);
