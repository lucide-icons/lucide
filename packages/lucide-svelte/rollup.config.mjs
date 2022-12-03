/* eslint-disable import/no-extraneous-dependencies */
import svelte from 'rollup-plugin-svelte';
import sveltePreprocess from "svelte-preprocess";
import pkg from './package.json' assert { type: 'json' };
import plugins from '@lucide/rollup-plugins';

const packageName = 'LucideSvelte';
const outputFileName = 'lucide-svelte';
const outputDir = 'dist';
const inputs = ['./src/lucide-svelte.ts'];
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
  {
    format: 'es',
    inputs,
    outputDir,
  },
  {
    format: 'esm',
    inputs,
    outputDir,
    preserveModules: true,
  },
];

const configs = bundles
  .map(({ inputs, outputDir, format, minify, preserveModules }) =>
    inputs.map(input => ({
      input,
      plugins: [
        svelte({
          include: 'src/**/*.svelte',
          preprocess: sveltePreprocess({
            typescript: true
          }),
          compilerOptions: {
            dev: false,
          },
          emitCss: false,
        }),
        ...plugins(pkg, minify),
      ],
      // external: ['svelte'],
      output: {
        name: packageName,
        ...(preserveModules
          ? {
              dir: `${outputDir}/${format}`,
            }
          : {
              file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
            }),
        preserveModules,
        format,
        sourcemap: true,
        // globals: {
        //   svelte: 'svelte',
        // },
      },
    })),
  )
  .flat();

export default configs;
