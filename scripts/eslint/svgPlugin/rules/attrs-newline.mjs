/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'layout',
    fixable: 'whitespace',
    docs: {
      description:
        'Require the listed elements to have every attribute on its own line, and all others to fit on one line',
    },
    schema: [
      {
        type: 'object',
        properties: {
          // Elements whose attributes and closing bracket each get their own line.
          multiline: { type: 'array', items: { type: 'string' }, uniqueItems: true },
        },
        additionalProperties: false,
      },
    ],
    defaultOptions: [{ multiline: [] }],
    messages: {
      attrOnNewLine: 'Attribute "{{name}}" of <{{element}}> must be on its own line.',
      closeOnNewLine: 'Closing bracket of <{{element}}> must be on its own line.',
      attrOnSameLine: 'Attribute "{{name}}" must be on the same line as <{{element}}>.',
      closeOnSameLine: 'Closing bracket must be on the same line as <{{element}}>.',
      valueOnOneLine: 'Value of attribute "{{name}}" must not contain line breaks.',
    },
  },
  create(context) {
    const [{ multiline }] = context.options;

    return {
      /** @param {any} node */
      Element(node) {
        const element = node.name;
        const isMultiline = multiline.includes(element) && node.attributes.length > 0;

        // The tag from left to right: `<name`, each attribute, then `>` or `/>`.
        const parts = [node.openStart, ...node.attributes, node.openEnd];
        for (let index = 1; index < parts.length; index++) {
          const previous = parts[index - 1];
          const part = parts[index];
          const isClose = part === node.openEnd;

          if (!isClose && part.literal.loc.start.line !== part.literal.loc.end.line) {
            context.report({
              loc: part.literal.loc,
              messageId: 'valueOnOneLine',
              data: { name: part.name },
            });
          }

          const onSameLine = previous.loc.end.line === part.loc.start.line;
          if (onSameLine !== isMultiline) continue;

          // Indentation of a new line is left to `indent`.
          const separator = isMultiline ? '\n' : isClose && !node.selfClosing ? '' : ' ';
          context.report({
            loc: part.loc,
            messageId: `${isClose ? 'close' : 'attr'}${isMultiline ? 'OnNewLine' : 'OnSameLine'}`,
            data: isClose ? { element } : { element, name: part.name },
            fix: (fixer) => fixer.replaceTextRange([previous.range[1], part.range[0]], separator),
          });
        }
      },
    };
  },
};
