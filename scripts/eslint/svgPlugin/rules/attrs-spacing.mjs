import { between } from '../utils.mjs';

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    docs: {
      description:
        'Enforce a single space between attributes and before `/>`, and none anywhere else in a tag',
    },
    schema: [],
    messages: {
      beforeAttr: 'Expected a single space before attribute "{{name}}".',
      aroundEquals: 'Unexpected whitespace around "=" of attribute "{{name}}".',
      beforeSelfClose: 'Expected a single space before "/>".',
      beforeClose: 'Unexpected whitespace before ">".',
      inClosingTag: 'Unexpected whitespace in closing tag </{{name}}>.',
    },
  },
  create(context) {
    const { text } = context.sourceCode;

    /**
     * Check what separates two neighbouring parts of a tag that are on the same line. Parts on
     * different lines are up to `attrs-newline` and `indent`.
     *
     * @param {import('../parser.mjs').Located} left
     * @param {import('../parser.mjs').Located} right
     * @param {string} expected
     * @param {string} messageId
     * @param {Record<string, string>} [data]
     */
    const check = (left, right, expected, messageId, data) => {
      /** @type {[number, number]} */
      const range = [left.range[1], right.range[0]];
      const actual = text.slice(...range);
      if (actual === expected || /[\r\n]/.test(actual)) return;

      context.report({
        loc: between(left, right),
        messageId,
        data,
        fix: (fixer) => fixer.replaceTextRange(range, expected),
      });
    };

    return {
      /** @param {any} node */
      Element(node) {
        let previous = node.openStart;
        for (const attribute of node.attributes) {
          const { name, key, literal } = attribute;
          check(previous, attribute, ' ', 'beforeAttr', { name });

          if (literal.range[0] - key.range[1] !== 1) {
            context.report({
              loc: { start: key.loc.end, end: literal.loc.start },
              messageId: 'aroundEquals',
              data: { name },
              fix: (fixer) => fixer.replaceTextRange([key.range[1], literal.range[0]], '='),
            });
          }
          previous = attribute;
        }

        if (node.selfClosing) check(previous, node.openEnd, ' ', 'beforeSelfClose');
        else check(previous, node.openEnd, '', 'beforeClose');

        const { close } = node;
        if (close && text.slice(...close.range) !== `</${close.name}>`) {
          context.report({
            loc: close.loc,
            messageId: 'inClosingTag',
            data: { name: close.name },
            fix: (fixer) => fixer.replaceTextRange(close.range, `</${close.name}>`),
          });
        }
      },
    };
  },
};
