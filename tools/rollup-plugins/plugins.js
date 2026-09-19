import { visualizer } from 'rollup-plugin-visualizer';
import replace from '@rollup/plugin-replace';
import license from 'rollup-plugin-license';
import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import summary from 'rollup-plugin-summary';

const getLicenseBannerText = (pkg) => `@license ${pkg.name} v${pkg.version} - ${pkg.license}

This source code is licensed under the ${pkg.license} license.
See the LICENSE file in the root directory of this source tree.`;

// Mirrors rollup-plugin-license's default ("regular") block comment style, so builds that
// opt out of the plugin's own banner injection (see `withLicenseBanner` below) still get an
// identically formatted comment when applying the banner themselves, e.g. via `output.banner`.
const getLicenseBanner = (pkg) =>
  `/**\n${getLicenseBannerText(pkg)
    .split('\n')
    .map((line) => (line ? ` * ${line}` : ` *`))
    .join('\n')}\n */`;

const plugins = ({
  pkg,
  minify = false,
  withEsbuild = true,
  esbuildOptions = {},
  withSummary = false,
  // rollup-plugin-license injects its banner into every output chunk with no option to
  // restrict it to entry chunks (see https://github.com/lucide-icons/lucide/issues/3744).
  // Consumers that build with `preserveModules: true` and want a single banner per entry
  // point should set this to `false` and apply `getLicenseBanner` via `output.banner`
  // (which Rollup calls per chunk and can filter with `chunk.isEntry`) instead.
  withLicenseBanner = true,
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
    withLicenseBanner
      ? license({
          banner: getLicenseBannerText(pkg),
        })
      : null,
    withSummary ? summary() : null,
    visualizer({
      sourcemap: true,
      filename: `stats/${pkg.name}${minify ? '-min' : ''}.html`,
    }),
  ].filter(Boolean);

export { license, visualizer, replace, getLicenseBanner };

export default plugins;
