import plugins from '../../rollup.plugins';
import pkg from './package.json';

const outputFileName = pkg.name;
const outputDir = 'dist';
const inputs = ['src/lucide.js'];
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
      output: {
        name: outputFileName,
        file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
        format,
        sourcemap: true,
      },
    })),
  )
  .flat();

export default configs;
