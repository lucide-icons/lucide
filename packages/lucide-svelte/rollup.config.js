import plugins from '../../rollup.plugins';
import pkg from './package.json';

const packageName = 'LucideSvelte';
const outputFileName = 'lucide-svelte';
const rootDir = 'packages/lucide-svelte'; // It runs from the root
const outputDir = `${rootDir}/dist`;
const inputs = [`${rootDir}/src/lucide-svelte.js`];
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
        name: packageName,
        file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
        format,
        sourcemap: true,
      },
    })),
  )
  .flat();

export default configs;
