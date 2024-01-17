import pkg from '../package.json' assert { type: 'json' };

const BANNER = `@license ${pkg.name} v${pkg.version} - ${pkg.license}

This source code is licensed under the ${pkg.license} license.
See the LICENSE file in the root directory of this source tree.`;

export function getJSBanner() {
  const prefixedBanner = BANNER.split('\n')
    .map((line) => ` * ${line}`)
    .join('\n');

  return `/**
${prefixedBanner}
 */
`;
}
