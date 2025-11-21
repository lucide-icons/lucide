/* eslint-disable import/no-extraneous-dependencies */
import { visualizer } from 'rollup-plugin-visualizer';
import replace from '@rollup/plugin-replace';
import license from 'rollup-plugin-license';
import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import summary from "rollup-plugin-summary";

const plugins = ({ pkg, minify = false, withEsbuild = true, esbuildOptions = {}, withSummary = false }) =>
  [
    withEsbuild
      ? esbuild({
          minify,
          ...esbuildOptions,
        })
      : null,
    nodeResolve({
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
      resolveOnly: [/^@lucide\/.*$/],
    }),
    license({
      banner: `@license ${pkg.name} v${pkg.version} - ${pkg.license}

This source code is licensed under the ${pkg.license} license.
See the LICENSE file in the root directory of this source tree.`,
    }),
    withSummary ? summary() : null,
    visualizer({
      sourcemap: true,
      filename: `stats/${pkg.name}${minify ? '-min' : ''}.html`,
    }),
  ].filter(Boolean);

export { license, visualizer, replace };

export default plugins;
