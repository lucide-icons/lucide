import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import bundleSize from '@atomico/rollup-plugin-sizes';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';
import license from 'rollup-plugin-license';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import pkg from './package.json';

const outputFileName = pkg.name;

const inputs = ['build/featherity.js'];
const bundles = [
  { inputs, format: 'umd', dir: 'dist', minify: true },
  { inputs, format: 'umd', dir: 'dist' },
  { inputs, format: 'cjs', dir: 'dist' },
];

const configs = bundles
  .map(({ inputs, dir, format, minify }) =>
    inputs.map(input => ({
      input,
      external: ['lodash/camelCase', 'lodash/upperFirst'],
      plugins: [
        format === 'umd' &&
          replace({
            __DEV__: minify ? 'false' : 'true',
          }),
        babel({ babelHelpers: 'bundled' }),
        // The two minifiers together seem to procude a smaller bundle 🤷‍♂️
        minify && compiler(),
        minify && terser(),
        license({ banner: `${pkg.name} v${pkg.version} - ${pkg.license}` }),
        bundleSize(),
        resolve(),
        commonJS({
          include: 'node_modules/**',
        }),
        visualizer({
          sourcemap: true,
          filename: `stats/${outputFileName}${minify ? '-min' : ''}.html`,
        }),
      ].filter(Boolean),
      output: {
        name: 'featherity',
        file: `${dir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
        format,
        sourcemap: true,
        exports: 'named',
        globals: {
          'lodash/camelCase': 'camelCase',
          'lodash/upperFirst': 'upperFirst',
        },
      },
    })),
  )
  .flat();

export default configs;
