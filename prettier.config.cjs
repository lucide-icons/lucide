const config = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  overrides: [
    {
      files: ['icons/*.json', 'categories/*.json'],
      options: {
        printWidth: 0,
      },
    },
  ],
};

module.exports = config;
