const plural = (/** @type {number} */ count, /** @type {string} */ word) =>
  `${count} ${word}${count === 1 ? '' : 's'}`;

const describe = (/** @type {string} */ indent) => {
  const tabs = indent.split('\t').length - 1;
  const spaces = indent.length - tabs;
  if (tabs === 0) return plural(spaces, 'space');
  return spaces === 0
    ? plural(tabs, 'tab')
    : `${plural(spaces, 'space')} and ${plural(tabs, 'tab')}`;
};

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    docs: { description: 'Enforce consistent indentation with spaces' },
    schema: [{ type: 'integer', minimum: 0 }],
    defaultOptions: [2],
    messages: {
      wrong: 'Expected indentation of {{expected}}, but found {{actual}}.',
    },
  },
  create(context) {
    const [size] = context.options;
    const { text } = context.sourceCode;

    /**
     * Check the indentation of something that sits `depth` levels deep, if it starts its line.
     *
     * @param {import('../parser.mjs').Located} part
     * @param {number} depth
     */
    const check = (part, depth) => {
      const [start] = part.range;
      const lineStart = start - part.loc.start.column;
      const actual = text.slice(lineStart, start);
      if (/[^ \t]/.test(actual)) return;

      const expected = ' '.repeat(depth * size);
      if (actual === expected) return;

      context.report({
        loc: { start: { line: part.loc.start.line, column: 0 }, end: part.loc.start },
        messageId: 'wrong',
        data: { expected: describe(expected), actual: describe(actual) },
        fix: (fixer) => fixer.replaceTextRange([lineStart, start], expected),
      });
    };

    /**
     * @param {import('../parser.mjs').ChildNode[]} nodes
     * @param {number} depth
     */
    const checkAll = (nodes, depth) => {
      for (const node of nodes) {
        // Text has no business being here in the first place, see `no-text`.
        if (node.type === 'Text') continue;
        check(node, depth);
        if (node.type !== 'Element') continue;

        for (const attribute of node.attributes) check(attribute, depth + 1);
        check(node.openEnd, depth);
        checkAll(node.children, depth + 1);
        if (node.close) check(node.close, depth);
      }
    };

    return {
      /** @param {any} program */
      Program(program) {
        checkAll(program.body, 0);
      },
    };
  },
};
