/** @satisfies {import('prettier').Config} */
const config = {
  plugins: ['./prettier-plugin-lucide-svg.mjs'],
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  singleAttributePerLine: true,
  overrides: [
    {
      files: ['icons/*.json', 'categories/*.json', 'lab/*.json'],
      options: {
        printWidth: 0,
      },
    },
    {
      files: ['icons/*.svg'],
      options: {
        parser: 'lucide-svg',
      },
    },
  ],
};

export default config;
