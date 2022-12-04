/* eslint-disable import/no-extraneous-dependencies */
import bundleSize from '@atomico/rollup-plugin-sizes';
import { visualizer } from 'rollup-plugin-visualizer';
import license from 'rollup-plugin-license';
import esbuild from 'rollup-plugin-esbuild';

const plugins = (pkg, minify) =>
  [
    esbuild({
      minify,
    }),
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
