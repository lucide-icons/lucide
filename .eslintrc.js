module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['import', 'prettier'],
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
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./site/tsconfig.json', './packages/*/tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
