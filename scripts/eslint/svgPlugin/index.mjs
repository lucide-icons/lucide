import * as parser from './parser.mjs';
import allowedAttrValues from './rules/allowed-attr-values.mjs';
import allowedAttrs from './rules/allowed-attrs.mjs';
import allowedElements from './rules/allowed-elements.mjs';
import attrsNewline from './rules/attrs-newline.mjs';
import attrsSpacing from './rules/attrs-spacing.mjs';
import elementNewline from './rules/element-newline.mjs';
import indent from './rules/indent.mjs';
import noDuplicateAttrs from './rules/no-duplicate-attrs.mjs';
import noEmptyLines from './rules/no-empty-lines.mjs';
import noText from './rules/no-text.mjs';
import noTrailingSpaces from './rules/no-trailing-spaces.mjs';
import quotes from './rules/quotes.mjs';
import requireAttrs from './rules/require-attrs.mjs';
import selfClosing from './rules/self-closing.mjs';

/**
 * ESLint plugin that checks the syntax, content and formatting of SVG files.
 *
 * It brings its own strict XML parser (see `parser.mjs`), so malformed markup is a parsing error
 * instead of being silently repaired, and its rules can restrict a file to exactly the elements
 * and attributes an icon may have. Use it by setting `languageOptions.parser` to `svg.parser`.
 */
export default {
  meta: { name: 'svg' },
  parser,
  rules: {
    'allowed-attr-values': allowedAttrValues,
    'allowed-attrs': allowedAttrs,
    'allowed-elements': allowedElements,
    'attrs-newline': attrsNewline,
    'attrs-spacing': attrsSpacing,
    'element-newline': elementNewline,
    indent,
    'no-duplicate-attrs': noDuplicateAttrs,
    'no-empty-lines': noEmptyLines,
    'no-text': noText,
    'no-trailing-spaces': noTrailingSpaces,
    quotes,
    'require-attrs': requireAttrs,
    'self-closing': selfClosing,
  },
};
