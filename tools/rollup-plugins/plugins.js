/* eslint-disable import/no-extraneous-dependencies */
import { visualizer } from 'rollup-plugin-visualizer';
import bundleSize from '@atomico/rollup-plugin-sizes';
import replace from '@rollup/plugin-replace';
import license from 'rollup-plugin-license';
import esbuild from 'rollup-plugin-esbuild';

const plugins = (pkg, minify, esbuildOptions = {}) =>
  [
    esbuild({
      minify,
      ...esbuildOptions,
    }),
    license({
      banner: `@license ${pkg.name} v${pkg.version} - ${pkg.license}

This source code is licensed under the ${pkg.license} license.
See the LICENSE file in the root directory of this source tree.`,
    }),
    bundleSize(),
    visualizer({
      sourcemap: true,
      filename: `stats/${pkg.name}${minify ? '-min' : ''}.html`,
    }),
  ].filter(Boolean);

export { bundleSize, license, visualizer, replace };

export default plugins;
