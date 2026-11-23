/**
 * @import { Located } from './parser.mjs'
 */

/** Whether a string consists of XML whitespace only. A no-break space is not whitespace in XML, so `trim()` would be wrong here. */
export const isWhitespace = (/** @type {string} */ text) => /^[ \t\r\n]*$/.test(text);

/** Format a list of names for a message: `<path>, <line>` or `"fill", "stroke"`. */
export const list = (
  /** @type {string[]} */ names,
  /** @type {(name: string) => string} */ format,
) => names.map(format).join(', ');

export const asTag = (/** @type {string} */ name) => `<${name}>`;
export const quoted = (/** @type {string} */ name) => `"${name}"`;

/** The location between two parts of a tag, or of the right one when they touch. */
export const between = (/** @type {Located} */ left, /** @type {Located} */ right) =>
  left.range[1] === right.range[0] ? right.loc : { start: left.loc.end, end: right.loc.start };
