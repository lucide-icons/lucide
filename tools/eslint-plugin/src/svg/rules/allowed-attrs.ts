import type { SvgRule } from '../types.ts';
import { list, quoted } from '../utils.ts';

/** Element name → the attributes it may have. Elements that are not listed are not checked. */
type Options = [Record<string, string[]>];

const rule: SvgRule<Options> = {
  meta: {
    type: 'problem',
    docs: { description: 'Only allow the listed attributes on an element' },
    schema: [
      {
        type: 'object',
        additionalProperties: { type: 'array', items: { type: 'string' }, uniqueItems: true },
      },
    ],
    messages: {
      notAllowed:
        'Attribute "{{name}}" is not allowed on <{{element}}>. Allowed attributes: {{allowed}}.',
      none: 'Attribute "{{name}}" is not allowed on <{{element}}>, which takes no attributes.',
    },
  },
  create(context) {
    const [allowedByElement] = context.options;

    return {
      Element(node) {
        if (!Object.hasOwn(allowedByElement, node.name)) return;
        const allowed = allowedByElement[node.name];

        for (const attribute of node.attributes) {
          if (allowed.includes(attribute.name)) continue;
          context.report({
            loc: attribute.loc,
            messageId: allowed.length > 0 ? 'notAllowed' : 'none',
            data: { name: attribute.name, element: node.name, allowed: list(allowed, quoted) },
          });
        }
      },
    };
  },
};

export default rule;
