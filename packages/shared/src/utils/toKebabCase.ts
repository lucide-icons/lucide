/**
 * Converts string to kebab case
 *
 * @param {string} value
 * @returns {string} A kebabized string
 */
export const toKebabCase = (value: string): string =>
  (value.match(/\d+[xX]\d+|[A-Z]?[a-z]+|[A-Z]|\d+/g) ?? []).join('-').toLowerCase();
