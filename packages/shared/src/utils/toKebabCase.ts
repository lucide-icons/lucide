/**
 * Converts string to kebab case
 *
 * @param {string} string
 * @returns {string} A kebabized string
 */
export const toKebabCase = (string: string) =>
  string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
