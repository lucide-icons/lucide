/** Format a list of names for a message: `<path>, <line>` or `"fill", "stroke"`. */
export const list = (
  /** @type {string[]} */ names,
  /** @type {(name: string) => string} */ format,
) => names.map(format).join(', ');

export const asTag = (/** @type {string} */ name) => `<${name}>`;
export const quoted = (/** @type {string} */ name) => `"${name}"`;
