/* eslint-disable import/prefer-default-export */
/**
 * Converts string to KebabCase
 *
 * @param {string} string
 * @returns {string} A kebabized string
 */
export const toKebabCase = (string) =>
  string
    .replace(/([A-Z])([A-Z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/(?<!\d)([a-zA-Z])(\d)/g, '$1-$2')
    .toLowerCase();
