/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: { description: 'Require attributes on an element, optionally with an exact value' },
    schema: [
      {
        // Element name → attribute name → the required value, or `true` when any value will do.
        type: 'object',
        additionalProperties: {
          type: 'object',
          additionalProperties: { anyOf: [{ type: ['string', 'number'] }, { const: true }] },
        },
      },
    ],
    messages: {
      missing: '<{{element}}> is missing the attribute {{expected}}.',
      wrongValue: 'Expected {{expected}}, but found {{name}}="{{value}}".',
    },
  },
  create(context) {
    /** @type {Record<string, Record<string, string | number | true>>} */
    const requiredByElement = context.options[0];

    return {
      /** @param {any} node */
      Element(node) {
        if (!Object.hasOwn(requiredByElement, node.name)) return;

        for (const [name, required] of Object.entries(requiredByElement[node.name])) {
          const value = required === true ? null : String(required);
          const expected = value === null ? `"${name}"` : `${name}="${value}"`;
          const attribute = node.attributes.find((/** @type {any} */ attr) => attr.name === name);

          if (!attribute) {
            context.report({
              loc: node.openStart.loc,
              messageId: 'missing',
              data: { element: node.name, expected },
            });
          } else if (value !== null && attribute.value !== value) {
            context.report({
              loc: attribute.literal.loc,
              messageId: 'wrongValue',
              data: { expected, name, value: attribute.value },
              fix: (fixer) =>
                fixer.replaceTextRange(
                  attribute.literal.range,
                  `${attribute.quote}${value}${attribute.quote}`,
                ),
            });
          }
        }
      },
    };
  },
};
