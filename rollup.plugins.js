const babel = require('@rollup/plugin-babel').default;
const bundleSize = require('@atomico/rollup-plugin-sizes');
const compiler = require('@ampproject/rollup-plugin-closure-compiler');
const { terser } = require('rollup-plugin-terser');
const visualizer = require('rollup-plugin-visualizer');
const license = require('rollup-plugin-license');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const commonJS = require('rollup-plugin-commonjs');

const plugins = (pkg, minify) =>
  [
    replace({
      'icons = {}': 'icons = allIcons',
      delimiters: ['', ''],
    }),
    babel({
      babelHelpers: 'bundled',
    }),
    // The two minifiers together seem to procude a smaller bundle 🤷‍♂️
    minify && compiler(),
    minify && terser(),
    license({
      banner: `${pkg.name} v${pkg.version} - ${pkg.license}`,
    }),
    bundleSize(),
    resolve(),
    commonJS({
      include: 'node_modules/**',
    }),
    visualizer({
      sourcemap: true,
      filename: `stats/${pkg.name}${minify ? '-min' : ''}.html`,
    }),
  ].filter(Boolean);

module.exports = plugins;
