/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'layout',
    fixable: 'code',
    docs: { description: 'Require double quotes around attribute values' },
    schema: [],
    messages: {
      double: 'Expected double quotes around the value of "{{name}}".',
    },
  },
  create(context) {
    return {
      /** @param {any} node */
      Attribute(node) {
        if (node.quote === '"') return;
        context.report({
          loc: node.literal.loc,
          messageId: 'double',
          data: { name: node.name },
          // A value containing a double quote can't simply be requoted.
          fix: node.value.includes('"')
            ? null
            : (fixer) => fixer.replaceTextRange(node.literal.range, `"${node.value}"`),
        });
      },
    };
  },
};
