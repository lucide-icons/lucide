import { isWhitespace } from '../utils.mjs';

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'layout',
    fixable: 'code',
    docs: { description: 'Require elements without content to be self-closing' },
    schema: [],
    messages: {
      selfClose: 'Empty <{{name}}> must be self-closing: write "/>" instead of "></{{name}}>".',
    },
  },
  create(context) {
    return {
      /** @param {any} node */
      Element(node) {
        // The root is left alone: an empty file has a bigger problem than how its tag is closed.
        if (node.selfClosing || node.parent.type === 'Program') return;

        const isEmpty = node.children.every(
          (/** @type {any} */ child) => child.type === 'Text' && isWhitespace(child.value),
        );
        if (!isEmpty) return;

        const previous = node.attributes.at(-1) ?? node.openStart;
        context.report({
          loc: { start: node.openEnd.loc.start, end: node.close.loc.end },
          messageId: 'selfClose',
          data: { name: node.name },
          fix: (fixer) => fixer.replaceTextRange([previous.range[1], node.close.range[1]], ' />'),
        });
      },
    };
  },
};
