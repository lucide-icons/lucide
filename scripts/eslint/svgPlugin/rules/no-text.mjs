/** Make invisible and non-ASCII characters readable in a message. */
const visible = (/** @type {string} */ text) =>
  text.replace(
    /[^\x20-\x7E]/g,
    (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0').toUpperCase()}`,
  );

/** @type {import('eslint').Rule.RuleModule} */
export default {
  meta: {
    type: 'problem',
    docs: { description: 'Disallow text and CDATA sections' },
    schema: [],
    messages: {
      text: 'Unexpected text "{{text}}"; only elements are allowed.',
      cdata: 'Unexpected CDATA section; only elements are allowed.',
    },
  },
  create(context) {
    const { sourceCode } = context;

    return {
      /** @param {any} node */
      Text(node) {
        // XML whitespace only: a no-break or zero-width space is text, even if it can't be seen.
        const content = node.value.replace(/^[ \t\r\n]+|[ \t\r\n]+$/g, '');
        if (content === '') return;

        // Report just the text, not the line breaks and indentation around it.
        const start = node.range[0] + node.value.indexOf(content);
        const preview = content.replace(/[ \t\r\n]+/g, ' ');
        context.report({
          loc: {
            start: sourceCode.getLocFromIndex(start),
            end: sourceCode.getLocFromIndex(start + content.length),
          },
          messageId: 'text',
          data: { text: `${visible(preview.slice(0, 40))}${preview.length > 40 ? '...' : ''}` },
        });
      },
      /** @param {any} node */
      CData(node) {
        context.report({ node, messageId: 'cdata' });
      },
    };
  },
};
