module.exports = {
  env: {
    browser: true,
    node: true
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
        trailingComma: 'all'
      }
    ]
  }
};
