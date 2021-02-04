const plugins = require('lucide/rollup.plugins');
const pkg = require('./package.json');

const outputFileName = pkg.name;
const rootDir = 'packages/lucide-react'; // It runs from the root
const outputDir = `${rootDir}/dist`;
const inputs = [`${rootDir}/build/lucide-react.js`];
const bundles = [
  {
    format: 'umd',
    inputs,
    outputDir,
    minify: true,
  },
  {
    format: 'umd',
    inputs,
    outputDir,
  },
  {
    format: 'cjs',
    inputs,
    outputDir,
  },
];

const configs = bundles
  .map(({ inputs, outputDir, format, minify }) =>
    inputs.map(input => ({
      input,
      plugins: plugins(pkg, minify),
      external: ['react', 'prop-types'],
      output: {
        name: outputFileName,
        file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
        format,
        sourcemap: true,
        globals: {
          react: 'react',
          'prop-types': 'PropTypes',
        },
      },
    })),
  )
  .flat();

export default configs;
