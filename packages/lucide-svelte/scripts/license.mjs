import pkg from '../package.json' assert { type: 'json' };

export function getJSBanner() {
  return `/**
 * @license ${pkg.name} v${pkg.version} - ${pkg.license}
 *
 * This source code is licensed under the ${pkg.license} license.
 * See the LICENSE file in the root directory of this source tree.
 */
`;
}
