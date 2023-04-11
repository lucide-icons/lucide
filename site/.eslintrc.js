/* eslint-disable */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};
