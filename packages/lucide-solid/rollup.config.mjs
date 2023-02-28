// eslint-disable-next-line import/no-extraneous-dependencies
import withSolid from 'rollup-preset-solid';
import bundleSize from '@atomico/rollup-plugin-sizes';
import license from 'rollup-plugin-license';

import pkg from './package.json' assert { type: 'json' };

const config = withSolid({
  targets: ['esm', 'cjs'],
});

config.plugins = [
  ...config.plugins,
  license({
    banner: `${pkg.name} v${pkg.version} - ${pkg.license}`,
  }),
  bundleSize(),
];

export default config;
