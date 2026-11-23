import { isWhitespace } from '../utils.mjs';

/** @type {Record<string, string>} */
const NAMES = {
  CData: 'CDATA section',
  Comment: 'comment',
  Doctype: 'doctype',
  ProcessingInstruction: 'processing instruction',
};

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    docs: { description: 'Require every element and closing tag to start on its own line' },
    schema: [],
    messages: {
      missing: 'Expected a line break before {{name}}.',
    },
  },
  create(context) {
    const { text } = context.sourceCode;

    /**
     * @param {import('../parser.mjs').Located | null} previous
     * @param {import('../parser.mjs').Located} part
     * @param {string} name
     */
    const check = (previous, part, name) => {
      if (!previous || previous.loc.end.line !== part.loc.start.line) return;

      /** @type {[number, number]} */
      const gap = [previous.range[1], part.range[0]];
      context.report({
        loc: part.loc,
        messageId: 'missing',
        data: { name },
        // Indentation of the new line is left to `indent`.
        fix: (fixer) =>
          isWhitespace(text.slice(...gap))
            ? fixer.replaceTextRange(gap, '\n')
            : fixer.insertTextBeforeRange(part.range, '\n'),
      });
    };

    /**
     * @param {import('../parser.mjs').ChildNode[]} nodes
     * @param {import('../parser.mjs').Located | null} open
     * @param {(import('../parser.mjs').Located & { name: string }) | null} close
     */
    const checkChildren = (nodes, open, close) => {
      // Text has no business being here in the first place, see `no-text`.
      const children = nodes.filter((node) => node.type !== 'Text');
      if (children.length === 0) return;

      let previous = open;
      for (const child of children) {
        check(previous, child, child.type === 'Element' ? `<${child.name}>` : NAMES[child.type]);
        previous = child;
      }
      if (close) check(previous, close, `</${close.name}>`);
    };

    return {
      /** @param {any} program */
      Program(program) {
        checkChildren(program.body, null, null);
      },
      /** @param {any} node */
      Element(node) {
        checkChildren(node.children, node.openEnd, node.close);
      },
    };
  },
};
