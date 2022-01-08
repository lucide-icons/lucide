/* eslint-disable import/no-extraneous-dependencies */
import svelte from 'rollup-plugin-svelte';
import preprocess from 'svelte-preprocess';
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
    sourcemap: true,
  },
  {
    format: 'umd',
    inputs,
    outputDir,
    sourcemap: true,
  },
  {
    format: 'cjs',
    inputs,
    outputDir,
    sourcemap: true,
  },
];

const configs = bundles
  .map(({ inputs, outputDir, format, minify }) =>
    inputs.map(input => ({
      input,
      plugins: [
        svelte({
          preprocess,
          compilerOptions: {
            dev: false,
          },
          emitCss: false,
        }),
        ...plugins(pkg, minify),
      ],
      external: ['svelte'],
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
