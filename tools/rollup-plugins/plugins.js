import { visualizer } from 'rollup-plugin-visualizer';
import replace from '@rollup/plugin-replace';
import license from 'rollup-plugin-license';
import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';

/**
 * Wraps a plugin's `renderChunk` hook so it is skipped for chunks matching `exclude`.
 * Used to keep the license banner to a single chunk that every consumer path imports,
 * instead of repeating it in every module emitted with `preserveModules`.
 */
const skipRenderChunk = (plugin, exclude) => {
  if (!exclude) return plugin;

  const { renderChunk } = plugin;

  return {
    ...plugin,
    renderChunk(code, chunk, ...rest) {
      if (exclude(chunk)) return null;

      return renderChunk.call(this, code, chunk, ...rest);
    },
  };
};

const plugins = ({
  pkg,
  minify = false,
  withEsbuild = true,
  esbuildOptions = {},
  withSummary = false,
  licenseBannerExclude,
}) =>
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
    skipRenderChunk(
      license({
        banner: `@license ${pkg.name} v${pkg.version} - ${pkg.license}

This source code is licensed under the ${pkg.license} license.
See the LICENSE file in the root directory of this source tree.`,
      }),
      licenseBannerExclude,
    ),
    withSummary ? summary() : null,
    visualizer({
      sourcemap: true,
      filename: `stats/${pkg.name}${minify ? '-min' : ''}.html`,
    }),
  ].filter(Boolean);

export { license, visualizer, replace };

export default plugins;
