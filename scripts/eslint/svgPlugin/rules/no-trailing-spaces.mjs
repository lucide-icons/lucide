/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    docs: { description: 'Disallow whitespace at the end of a line' },
    schema: [],
    messages: {
      trailing: 'Trailing spaces are not allowed.',
    },
  },
  create(context) {
    const { sourceCode } = context;

    return {
      Program() {
        sourceCode.lines.forEach((text, index) => {
          const trailing = /[ \t]+$/.exec(text);
          if (!trailing) return;

          const line = index + 1;
          const loc = {
            start: { line, column: trailing.index },
            end: { line, column: text.length },
          };
          context.report({
            loc,
            messageId: 'trailing',
            fix: (fixer) =>
              fixer.removeRange([
                sourceCode.getIndexFromLoc(loc.start),
                sourceCode.getIndexFromLoc(loc.end),
              ]),
          });
        });
      },
    };
  },
};
