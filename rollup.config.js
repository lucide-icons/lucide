const babel = require('@rollup/plugin-babel').default;
const bundleSize = require('@atomico/rollup-plugin-sizes');
const compiler = require('@ampproject/rollup-plugin-closure-compiler');
const { terser } = require('rollup-plugin-terser');
const visualizer = require('rollup-plugin-visualizer');
const license = require('rollup-plugin-license');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const commonJS = require('rollup-plugin-commonjs');
const pkg = require('./package.json');

const outputFileName = pkg.name;
const outputDir = 'dist';
const inputs = ['build/lucide.js'];
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

const plugins = minify =>
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
      filename: `stats/${outputFileName}${minify ? '-min' : ''}.html`,
    }),
  ].filter(Boolean);

const configs = bundles
  .map(({ inputs, outputDir, format, minify }) =>
    inputs.map(input => ({
      input,
      external: ['lodash/camelCase', 'lodash/upperFirst'],
      plugins: plugins(minify),
      output: {
        name: outputFileName,
        file: `${outputDir}/${format}/${outputFileName}${minify ? '.min' : ''}.js`,
        format,
        sourcemap: true,
        globals: {
          'lodash/camelCase': 'camelCase',
          'lodash/upperFirst': 'upperFirst',
        },
      },
    })),
  )
  .flat();

exports.plugins = plugins;
exports.default = configs;
