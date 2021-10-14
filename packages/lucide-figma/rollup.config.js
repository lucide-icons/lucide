/* eslint-disable import/no-extraneous-dependencies */
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import bundleSize from '@atomico/rollup-plugin-sizes';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import resolve, { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import html from '@rollup/plugin-html';
import commonJS from '@rollup/plugin-commonjs';

// const inputName = 'lucide-react';
const rootDir = 'packages/lucide-figma'; // It runs from the root
const outputDir = `${rootDir}/dist`;
const inputs = [
  {
    name: 'main',
    input: `${rootDir}/src/main.ts`,
  },
  {
    name: 'worker',
    input: `${rootDir}/src/worker/worker.ts`,
    htmlTemplate: `${rootDir}/src/worker/worker.html`,
  },
  {
    name: 'interface',
    input: `${rootDir}/src/interface/interface.tsx`,
    htmlTemplate: `${rootDir}/src/interface/interface.html`,
  },
];

const minify = true;
// const format = 'esm';
// const bundles = [
//   {
//     format: 'esm',
//     inputs,
//     outputDir,
//     minify: true,
//   },
// ];

// const configs = bundles
//   .map(({ inputs, outputDir, format, minify }) =>
export default inputs.map(({ name, input, htmlTemplate = null }) => ({
  input,
  plugins: [
    babel({
      babelHelpers: 'bundled',
    }),
    // The two minifiers together seem to procude a smaller bundle 🤷‍♂️
    minify && compiler(),
    minify && terser(),
    bundleSize(),
    htmlTemplate && html(htmlTemplate),
    commonJS({
      include: 'node_modules/**',
    }),
    typescript({ tsconfig: `${rootDir}/tsconfig.json` }),
    resolve(),
    nodeResolve(),
  ].filter(Boolean),
  external: ['figma'],
  output: {
    name: 'lucide-figma',
    file: `${outputDir}/${name}${minify ? '.min' : ''}.js`,
    format: 'esm',
    sourcemap: true,
    globals: {
      figma: 'figma',
    },
  },
}));
// )
// .flat();

// export default configs;
