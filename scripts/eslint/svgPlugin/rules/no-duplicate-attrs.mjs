/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: { description: 'Disallow repeating an attribute on an element' },
    schema: [],
    messages: {
      duplicate: 'Duplicate attribute "{{name}}".',
    },
  },
  create(context) {
    return {
      /** @param {any} node */
      Element(node) {
        const seen = new Set();
        for (const attribute of node.attributes) {
          if (seen.has(attribute.name)) {
            context.report({
              loc: attribute.loc,
              messageId: 'duplicate',
              data: { name: attribute.name },
            });
          }
          seen.add(attribute.name);
        }
      },
    };
  },
};
