import { list, quoted } from '../utils.mjs';

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: { description: 'Only allow the listed values for an attribute, on any element' },
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          attrs: { type: 'array', items: { type: 'string' }, minItems: 1, uniqueItems: true },
          values: { type: 'array', items: { type: 'string' }, uniqueItems: true },
          // Replaces the default message, to explain why.
          message: { type: 'string' },
        },
        required: ['attrs', 'values'],
        additionalProperties: false,
      },
    },
    messages: {
      notAllowed: '{{name}}="{{value}}" is not allowed. Allowed values: {{allowed}}.',
      custom: '{{message}}',
    },
  },
  create(context) {
    /** @type {{ attrs: string[], values: string[], message?: string }[]} */
    const restrictions = context.options;

    return {
      /** @param {any} node */
      Attribute(node) {
        for (const { attrs, values, message } of restrictions) {
          if (!attrs.includes(node.name) || values.includes(node.value)) continue;
          context.report({
            loc: node.literal.loc,
            ...(message
              ? { messageId: 'custom', data: { message } }
              : {
                  messageId: 'notAllowed',
                  data: { name: node.name, value: node.value, allowed: list(values, quoted) },
                }),
          });
        }
      },
    };
  },
};
