/**
 * Converts string to CamelCase
 *
 * @param {string} string
 * @returns {string} A camelized string
 */
export const toCamelCase = (string: string): string =>
  string.replace(/^([A-Z])|[\s-_]+(\w)?/g, (match, p1, p2) =>
    p1 ? p1.toLowerCase() : p2 ? p2.toUpperCase() : match,
  );
