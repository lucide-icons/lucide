import fs from 'fs';
import pkg from '../package.json' with { type: 'json' };

const license = fs.readFileSync('LICENSE', 'utf-8');

export function getJSBanner() {
  return `/**
 * @license ${pkg.name} v${pkg.version} - ${pkg.license}
 *
 * ${license.split('\n').join('\n * ')}
 */
`;
}
