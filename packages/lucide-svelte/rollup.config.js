/* eslint-disable import/no-extraneous-dependencies */
import svelte from 'rollup-plugin-svelte';
import preprocess from 'svelte-preprocess';
import bundleSize from '@atomico/rollup-plugin-sizes';
import { terser } from 'rollup-plugin-terser';
import license from 'rollup-plugin-license';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';
import pkg from './package.json';

const packageName = 'LucideSvelte';
const outputFileName = 'lucide-svelte';
const outputDir = 'dist';
const inputs = ['./src/lucide-svelte.js'];
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
        resolve(),
        commonJS({
          include: 'node_modules/**',
        }),
        minify && terser(),
        license({
          banner: `${pkg.name} v${pkg.version} - ${pkg.license}`,
        }),
        bundleSize(),
      ],
      external: ['svelte'],
      output: {
        name: packageName,
        file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
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
