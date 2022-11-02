import plugins from '../../rollup.plugins';
import pkg from './package.json';

const packageName = 'LucideSolid';
const outputFileName = 'lucide-solid';
const outputDir = 'dist';
const inputs = [`src/lucide-solid.js`];
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
      external: ['solid-js', 'solid-js/h'],
      output: {
        name: packageName,
        file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
        format,
        sourcemap: true,
        globals: {
          'solid-js': 'solid-js',
          'solid-js/h': 'solid-js/h',
        },
      },
    })),
  )
  .flat();

export default configs;
