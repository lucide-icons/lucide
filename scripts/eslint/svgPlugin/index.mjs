import * as parser from './parser.mjs';
import allowedAttrValues from './rules/allowed-attr-values.mjs';
import allowedAttrs from './rules/allowed-attrs.mjs';
import allowedElements from './rules/allowed-elements.mjs';
import noText from './rules/no-text.mjs';
import requireAttrs from './rules/require-attrs.mjs';

/**
 * ESLint plugin that checks what an SVG file contains.
 *
 * Its parser (see `parser.mjs`) is strict, so malformed markup is a parsing error instead of being
 * silently repaired, and its rules can restrict a file to exactly the elements and attributes an
 * icon may have. Use it by setting `languageOptions.parser` to `svg.parser`.
 *
 * How a file is formatted is not checked here. That is up to Prettier, see
 * `prettier-plugin-lucide-svg.mjs`.
 */
export default {
  meta: { name: 'svg' },
  parser,
  rules: {
    'allowed-attr-values': allowedAttrValues,
    'allowed-attrs': allowedAttrs,
    'allowed-elements': allowedElements,
    'no-text': noText,
    'require-attrs': requireAttrs,
  },
};
