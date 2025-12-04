/* eslint-disable import/prefer-default-export */
/**
 * Minifies SVG
 *
 * @param {string} string
 * @returns string
 */
export function minifySvg(string: string): string {
  return string
    ? string
        .replace(/>[\r\n ]+</g, '><')
        .replace(/(<.*?>)|\s+/g, (m, $1) => $1 || ' ')
        .trim()
    : '';
}
