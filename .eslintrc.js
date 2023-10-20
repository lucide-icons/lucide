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
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'import', '@html-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        'moduleDirectory': ['src', 'node_modules']
      },
    },
  },
  rules: {
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'no-use-before-define': 'off',
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
    // indent: 'off',
    // '@typescript-eslint/indent': ['error', 2, {
    //   ...airbnbIndentOptions,
    //   ignoredNodes: [
    //     'JSXElement',
    //     'JSXElement > *',
    //     'JSXAttribute',
    //     'JSXIdentifier',
    //     'JSXNamespacedName',
    //     'JSXMemberExpression',
    //     'JSXSpreadAttribute',
    //     'JSXExpressionContainer',
    //     'JSXOpeningElement',
    //     'JSXClosingElement',
    //     'JSXFragment',
    //     'JSXOpeningFragment',
    //     'JSXClosingFragment',
    //     'JSXText',
    //     'JSXEmptyExpression',
    //     'JSXSpreadChild',
    //     'PropertyDefinition[decorators]',
    //     'TSUnionType',
    //     'TSTypeParameterInstantiation',
    //     'TSIntersectionType',
    //   ]
    // }],

    // Imports
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          '**/*.spec.js',
          '**/*.stories.js',
          '**/*.test.ts',
          '**/*.spec.ts',
          '**/*.stories.ts',
          '**/*.stories.js',
          '**/*.test.jsx',
          '**/*.test.tsx',
          '**/*.spec.tsx',
          '**/*.stories.tsx',
          '**/jest.config.js',
          '**/jest.setup.js',
        ],
        peerDependencies: true,
        optionalDependencies: true,
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

  overrides: [
    {
      files: ['*.svg'],
      parser: '@html-eslint/parser',
    },
  ],
};
