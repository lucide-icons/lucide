import plugins from '../../rollup.plugins';
import pkg from './package.json';

const packageName = 'LucidePreact';
const outputFileName = 'lucide-preact';
const outputDir = 'dist';
const inputs = [`src/lucide-preact.js`];
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
      external: ['preact', 'prop-types'],
      output: {
        name: packageName,
        file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
        format,
        sourcemap: true,
        globals: {
          preact: 'preact',
          'prop-types': 'PropTypes',
        },
      },
    })),
  )
  .flat();

export default configs;
