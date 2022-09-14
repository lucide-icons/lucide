/* eslint-disable import/no-extraneous-dependencies */
import babel from '@rollup/plugin-babel';
import bundleSize from '@atomico/rollup-plugin-sizes';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';
import license from 'rollup-plugin-license';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs';

const plugins = (pkg, minify) =>
  [
    replace({
      'icons = {}': 'icons = allIcons',
      delimiters: ['', ''],
      preventAssignment: false,
    }),
    resolve(),
    commonJS({
      include: 'node_modules/**',
    }),
    babel({
      babelHelpers: 'bundled',
    }),
    minify && terser(),
    license({
      banner: `${pkg.name} v${pkg.version} - ${pkg.license}`,
    }),
    bundleSize(),
    visualizer({
      sourcemap: true,
      filename: `stats/${pkg.name}${minify ? '-min' : ''}.html`,
    }),
  ].filter(Boolean);

export default plugins;
