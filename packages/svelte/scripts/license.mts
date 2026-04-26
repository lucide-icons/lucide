import fs from 'fs';
import pkg from '../package.json' with { type: 'json' };

const license = fs.readFileSync('LICENSE', 'utf-8');

export function getHTMLBanner() {
  return `\
<!--
${pkg.name} v${pkg.version} - ${pkg.license}

This source code is licensed under the ${pkg.license} license.
See the LICENSE file in the root directory of this source tree.
-->

`;
}

export function getJSBanner() {
  return `\
/**
 * @file
 * @license ${pkg.name} v${pkg.version} - ${pkg.license}
 *
 * This source code is licensed under the ${pkg.license} license.
 * See the LICENSE file in the root directory of this source tree.
 */
`;
}
