const isEmpty = (/** @type {string} */ line) => /^[ \t]*$/.test(line);

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    docs: { description: 'Disallow empty lines' },
    schema: [],
    messages: {
      empty: 'Empty lines are not allowed.',
    },
  },
  create(context) {
    const { sourceCode } = context;

    return {
      Program() {
        const { lines } = sourceCode;
        // The last entry is whatever follows the final line break, not a line of its own.
        const count = lines.at(-1) === '' ? lines.length - 1 : lines.length;

        for (let first = 0; first < count; first++) {
          if (!isEmpty(lines[first])) continue;

          // Report a run of empty lines as one problem.
          let last = first;
          while (last + 1 < count && isEmpty(lines[last + 1])) last++;

          const start = { line: first + 1, column: 0 };
          const end = { line: last + 1, column: lines[last].length };
          const hasNextLine = last + 1 < lines.length;
          context.report({
            loc: { start, end },
            messageId: 'empty',
            fix: (fixer) =>
              fixer.removeRange([
                sourceCode.getIndexFromLoc(start),
                sourceCode.getIndexFromLoc(hasNextLine ? { line: last + 2, column: 0 } : end),
              ]),
          });
          first = last;
        }
      },
    };
  },
};
