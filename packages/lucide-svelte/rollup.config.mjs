/* eslint-disable import/no-extraneous-dependencies */
import svelte from 'rollup-plugin-svelte';
import preprocess from 'svelte-preprocess';
import bundleSize from '@atomico/rollup-plugin-sizes';
import { terser } from 'rollup-plugin-terser';
import license from 'rollup-plugin-license';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
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
        globals: {
          svelte: 'svelte',
        },
      },
    })),
  )
  .flat();

export default configs;
