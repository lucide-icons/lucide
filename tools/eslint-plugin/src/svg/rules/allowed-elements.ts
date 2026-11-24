import type { SvgRule } from '../types.ts';
import { asTag, list } from '../utils.ts';

type Options = [{ root: string; children: string[] }];

const rule: SvgRule<Options> = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require a given root element that only contains the listed, childless elements',
    },
    schema: [
      {
        type: 'object',
        properties: {
          // Name of the root element.
          root: { type: 'string' },
          // Elements allowed directly inside the root. They can't have child elements themselves.
          children: { type: 'array', items: { type: 'string' }, uniqueItems: true },
        },
        required: ['root', 'children'],
        additionalProperties: false,
      },
    ],
    messages: {
      root: 'Root element must be <{{root}}>, not <{{name}}>.',
      notAllowed: '<{{name}}> is not allowed. Allowed elements: {{allowed}}.',
      nested: '<{{name}}> must be a direct child of <{{root}}>, not of <{{parent}}>.',
    },
  },
  create(context) {
    const { root, children } = context.options[0];

    return {
      Element(node) {
        const { name, parent } = node;

        if (parent.type === 'Program') {
          if (name !== root) {
            context.report({ loc: node.openStart.loc, messageId: 'root', data: { root, name } });
          }
        } else if (!children.includes(name)) {
          context.report({
            loc: node.openStart.loc,
            messageId: 'notAllowed',
            data: { name, allowed: list(children, asTag) },
          });
        } else if (parent.parent.type !== 'Program') {
          context.report({
            loc: node.openStart.loc,
            messageId: 'nested',
            data: { name, root, parent: parent.name },
          });
        }
      },
    };
  },
};

export default rule;
