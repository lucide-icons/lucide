/** @satisfies {import('prettier').Config} */
const config = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  singleAttributePerLine: true,
  overrides: [
    {
      files: ['icons/*.json', 'categories/*.json'],
      options: {
        printWidth: 0,
      },
    },
    { files: '*.svelte', options: { parser: 'svelte' } },
  ],
};

export default config;
