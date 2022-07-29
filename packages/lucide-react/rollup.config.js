import plugins from '../../rollup.plugins';
import pkg from './package.json';

const packageName = 'LucideReact';
const outputFileName = 'lucide-react';
const outputDir = `dist`;
const inputs = [`src/lucide-react.js`];
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
      external: ['react', 'prop-types', 'lucide'],
      output: {
        name: packageName,
        file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
        format,
        sourcemap: true,
        globals: {
          react: 'react',
          'prop-types': 'PropTypes',
          lucide: 'lucide',
        },
      },
    })),
  )
  .flat();

export default configs;
