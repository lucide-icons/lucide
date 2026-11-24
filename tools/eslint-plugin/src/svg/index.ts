import type { ESLint, Linter } from 'eslint';
import * as parser from './parser.ts';
import allowedAttrValues from './rules/allowed-attr-values.ts';
import allowedAttrs from './rules/allowed-attrs.ts';
import allowedElements from './rules/allowed-elements.ts';
import noText from './rules/no-text.ts';
import requireAttrs from './rules/require-attrs.ts';

/**
 * ESLint plugin that checks what an SVG file contains.
 *
 * Its parser (see `parser.ts`) is strict, so malformed markup is a parsing error instead of being
 * silently repaired, and its rules can restrict a file to exactly the elements and attributes an
 * icon may have. Use it by setting `languageOptions.parser` to `svg.parser`.
 *
 * How a file is formatted is not checked here. That is up to Prettier, see
 * `prettier-plugin-lucide-svg.mjs`.
 */
const plugin = {
  meta: { name: 'svg' },
  parser,
  rules: {
    'allowed-attr-values': allowedAttrValues,
    'allowed-attrs': allowedAttrs,
    'allowed-elements': allowedElements,
    'no-text': noText,
    'require-attrs': requireAttrs,
  },
} satisfies ESLint.Plugin & { parser: Linter.Parser };

export default plugin;
