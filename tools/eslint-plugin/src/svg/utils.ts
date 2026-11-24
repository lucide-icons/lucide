/** Format a list of names for a message: `<path>, <line>` or `"fill", "stroke"`. */
export const list = (names: string[], format: (name: string) => string) =>
  names.map(format).join(', ');

export const asTag = (name: string) => `<${name}>`;
export const quoted = (name: string) => `"${name}"`;
