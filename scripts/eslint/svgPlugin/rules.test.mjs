import { describe, it } from 'node:test';
import { RuleTester } from 'eslint';

import svg from './index.mjs';

RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

const ruleTester = new RuleTester({ languageOptions: { parser: svg.parser } });

/** An icon in the canonical format, with the given lines inside its `<svg>`. */
const icon = (/** @type {string[]} */ ...lines) =>
  [
    '<svg',
    '  xmlns="http://www.w3.org/2000/svg"',
    '  width="24"',
    '  height="24"',
    '  viewBox="0 0 24 24"',
    '>',
    ...lines.map((line) => `  ${line}`),
    '</svg>',
    '',
  ].join('\n');

const heart = icon('<path d="M12 8v8" />', '<circle cx="12" cy="12" r="10" />');

ruleTester.run('no-text', svg.rules['no-text'], {
  valid: [heart, '<svg>\n\t \r\n</svg>'],
  invalid: [
    {
      // https://github.com/lucide-icons/lucide/blob/c2dd25753da3f25d9ddc351ddb0ee72332189692/icons/square-letter-d.svg#L13
      code: icon('<path d="M12 8v8" />', ']', '<rect width="18" height="18" x="3" y="3" rx="2" />'),
      errors: [
        {
          message: 'Unexpected text "]"; only elements are allowed.',
          line: 8,
          column: 3,
          endLine: 8,
          endColumn: 4,
        },
      ],
    },
    {
      code: icon('<title>Heart</title>'),
      errors: [{ messageId: 'text', data: { text: 'Heart' }, line: 7, column: 10 }],
    },
    {
      code: 'before\n<svg />\n  after\n  the   root\n',
      errors: [
        { messageId: 'text', data: { text: 'before' }, line: 1, column: 1 },
        { messageId: 'text', data: { text: 'after the root' }, line: 3, endLine: 4, endColumn: 13 },
      ],
    },
    {
      // A no-break space is invisible, but it is not whitespace in XML.
      code: '<svg>\u00A0</svg>',
      errors: [{ messageId: 'text', data: { text: '\\u00A0' } }],
    },
    {
      code: `<svg>${'a'.repeat(50)}</svg>`,
      errors: [{ messageId: 'text', data: { text: `${'a'.repeat(40)}...` } }],
    },
    {
      code: '<svg><![CDATA[text]]></svg>',
      errors: [{ messageId: 'cdata', column: 6, endColumn: 22 }],
    },
  ],
});

{
  const options = [{ root: 'svg', children: ['path', 'circle'] }];

  ruleTester.run('allowed-elements', svg.rules['allowed-elements'], {
    valid: [{ code: heart, options }],
    invalid: [
      {
        code: icon('<title>Heart</title>', '<path d="M12 8v8" />'),
        options,
        errors: [
          {
            message: '<title> is not allowed. Allowed elements: <path>, <circle>.',
            line: 7,
            column: 3,
            endColumn: 9,
          },
        ],
      },
      {
        code: '<html />',
        options,
        errors: [{ message: 'Root element must be <svg>, not <html>.' }],
      },
      {
        // Element names are case-sensitive, and the root may not be nested.
        code: icon('<Path />', '<svg />'),
        options,
        errors: [
          { messageId: 'notAllowed', data: { name: 'Path', allowed: '<path>, <circle>' } },
          { messageId: 'notAllowed', data: { name: 'svg', allowed: '<path>, <circle>' } },
        ],
      },
      {
        code: icon('<g>', '  <path d="M12 8v8">', '    <circle />', '  </path>', '</g>'),
        options,
        errors: [
          { messageId: 'notAllowed', data: { name: 'g', allowed: '<path>, <circle>' }, line: 7 },
          { message: '<path> must be a direct child of <svg>, not of <g>.', line: 8 },
          { message: '<circle> must be a direct child of <svg>, not of <path>.', line: 9 },
        ],
      },
    ],
  });
}

{
  const options = [{ svg: ['xmlns', 'width', 'height', 'viewBox'], path: ['d'], circle: [] }];

  ruleTester.run('allowed-attrs', svg.rules['allowed-attrs'], {
    valid: [
      { code: icon('<path d="M12 8v8" />', '<circle />'), options },
      // Elements that are not configured are not checked.
      { code: icon('<rect transform="rotate(45)" />'), options },
    ],
    invalid: [
      {
        code: icon('<path d="M12 8v8" style="color: red" transform="rotate(45)" />'),
        options,
        errors: [
          {
            message: 'Attribute "style" is not allowed on <path>. Allowed attributes: "d".',
            line: 7,
            column: 21,
            endColumn: 39,
          },
          { messageId: 'notAllowed', data: { name: 'transform', element: 'path', allowed: '"d"' } },
        ],
      },
      {
        code: '<svg class="lucide" />',
        options,
        errors: [
          {
            messageId: 'notAllowed',
            data: {
              name: 'class',
              element: 'svg',
              allowed: '"xmlns", "width", "height", "viewBox"',
            },
          },
        ],
      },
      {
        code: icon('<circle r="1" />'),
        options,
        errors: [
          { message: 'Attribute "r" is not allowed on <circle>, which takes no attributes.' },
        ],
      },
    ],
  });
}

{
  const colors = { attrs: ['fill', 'stroke'], values: ['none', 'currentColor'] };

  ruleTester.run('allowed-attr-values', svg.rules['allowed-attr-values'], {
    valid: [
      { code: '<svg fill="none" stroke="currentColor"><path fill="currentColor" /></svg>' },
      { code: '<svg fill="none"><path fill="currentColor" d="red" /></svg>', options: [colors] },
    ],
    invalid: [
      {
        code: '<svg fill="none"><path fill="red" /></svg>',
        options: [colors],
        errors: [
          {
            message: 'fill="red" is not allowed. Allowed values: "none", "currentColor".',
            column: 29,
            endColumn: 34,
          },
        ],
      },
      {
        code: '<svg stroke="#000" width="24" />',
        options: [
          { ...colors, message: 'Icons must inherit their colors.' },
          { attrs: ['width'], values: [] },
        ],
        errors: [
          { message: 'Icons must inherit their colors.', column: 13 },
          { message: 'width="24" is not allowed. Allowed values: .', column: 26 },
        ],
      },
    ],
  });
}

{
  const options = [{ svg: { xmlns: 'http://www.w3.org/2000/svg', width: 24, viewBox: true } }];

  ruleTester.run('require-attrs', svg.rules['require-attrs'], {
    valid: [
      { code: heart, options },
      {
        code: '<svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 16 16" />',
        options,
      },
      // Only the configured elements are checked.
      { code: '<g />', options },
    ],
    invalid: [
      {
        code: '<svg\n  width="24"\n/>',
        options,
        errors: [
          {
            message: '<svg> is missing the attribute xmlns="http://www.w3.org/2000/svg".',
            line: 1,
            column: 1,
            endColumn: 5,
          },
          { message: '<svg> is missing the attribute "viewBox".' },
        ],
      },
      {
        code: `<svg xmlns="http://www.w3.org/2000/svg" width='16' viewBox="" />`,
        output: `<svg xmlns="http://www.w3.org/2000/svg" width='24' viewBox="" />`,
        options,
        errors: [
          {
            message: 'Expected width="24", but found width="16".',
            column: 47,
            endColumn: 51,
          },
        ],
      },
    ],
  });
}

ruleTester.run('no-duplicate-attrs', svg.rules['no-duplicate-attrs'], {
  valid: [heart, '<svg><path d="M1 2" /><path d="M3 4" /></svg>'],
  invalid: [
    {
      code: '<svg><path d="M1 2" d="M3 4" d="M5 6" /></svg>',
      errors: [
        { message: 'Duplicate attribute "d".', column: 21, endColumn: 29 },
        { message: 'Duplicate attribute "d".', column: 30 },
      ],
    },
  ],
});

ruleTester.run('indent', svg.rules.indent, {
  valid: [
    heart,
    // Only what starts a line is checked, at the depth it has in the tree.
    '<svg><path\n    d="M1 2"\n  /></svg>',
    { code: '<svg\n    width="24"\n>\n    <path />\n</svg>', options: [4] },
    '<!-- comment -->\n<svg>\n  <!-- comment -->\n</svg>',
  ],
  invalid: [
    {
      code: '<svg\n width="24"\n   height="24"\n  >\n<path />\n\t<circle />\n \t<rect />\n  </svg>',
      output: '<svg\n  width="24"\n  height="24"\n>\n  <path />\n  <circle />\n  <rect />\n</svg>',
      errors: [
        {
          message: 'Expected indentation of 2 spaces, but found 1 space.',
          line: 2,
          column: 1,
          endColumn: 2,
        },
        { message: 'Expected indentation of 2 spaces, but found 3 spaces.', line: 3 },
        { message: 'Expected indentation of 0 spaces, but found 2 spaces.', line: 4 },
        { message: 'Expected indentation of 2 spaces, but found 0 spaces.', line: 5 },
        { message: 'Expected indentation of 2 spaces, but found 1 tab.', line: 6 },
        { message: 'Expected indentation of 2 spaces, but found 1 space and 1 tab.', line: 7 },
        { message: 'Expected indentation of 0 spaces, but found 2 spaces.', line: 8 },
      ],
    },
    {
      code: '  <svg>\n  <g>\n  <path />\n  </g>\n</svg>',
      output: '<svg>\n  <g>\n    <path />\n  </g>\n</svg>',
      errors: [
        { messageId: 'wrong', line: 1 },
        { messageId: 'wrong', data: { expected: '4 spaces', actual: '2 spaces' }, line: 3 },
      ],
    },
  ],
});

ruleTester.run('no-trailing-spaces', svg.rules['no-trailing-spaces'], {
  valid: [heart, heart.replaceAll('\n', '\r\n')],
  invalid: [
    {
      code: '<svg>  \n  <path />\t\n</svg> ',
      output: '<svg>\n  <path />\n</svg>',
      errors: [
        { messageId: 'trailing', line: 1, column: 6, endColumn: 8 },
        { messageId: 'trailing', line: 2, column: 11, endColumn: 12 },
        { messageId: 'trailing', line: 3, column: 7, endColumn: 8 },
      ],
    },
    {
      code: '<svg> \r\n</svg>\r\n',
      output: '<svg>\r\n</svg>\r\n',
      errors: [{ messageId: 'trailing', line: 1 }],
    },
  ],
});

ruleTester.run('no-empty-lines', svg.rules['no-empty-lines'], {
  valid: [heart, '<svg />'],
  invalid: [
    {
      code: '\n<svg>\n\n  \n  <path />\n</svg>\n\n',
      output: '<svg>\n  <path />\n</svg>\n',
      errors: [
        { messageId: 'empty', line: 1, column: 1, endLine: 1, endColumn: 1 },
        { messageId: 'empty', line: 3, column: 1, endLine: 4, endColumn: 3 },
        { messageId: 'empty', line: 7 },
      ],
    },
    {
      code: '<svg />\n  ',
      output: '<svg />\n',
      errors: [{ messageId: 'empty', line: 2 }],
    },
    {
      code: '<svg>\r\n\r\n</svg>\r\n',
      output: '<svg>\r\n</svg>\r\n',
      errors: [{ messageId: 'empty', line: 2 }],
    },
  ],
});

ruleTester.run('quotes', svg.rules.quotes, {
  valid: [heart, `<svg><path d="it's" /></svg>`],
  invalid: [
    {
      code: `<svg width='24'><path d = 'M1 2' /></svg>`,
      output: `<svg width="24"><path d = "M1 2" /></svg>`,
      errors: [
        {
          message: 'Expected double quotes around the value of "width".',
          column: 12,
          endColumn: 16,
        },
        { messageId: 'double', data: { name: 'd' } },
      ],
    },
    {
      // Can't be fixed by swapping the quotes.
      code: `<svg aria-label='a "heart"' />`,
      output: null,
      errors: [{ messageId: 'double' }],
    },
  ],
});

ruleTester.run('attrs-spacing', svg.rules['attrs-spacing'], {
  valid: [
    heart,
    '<svg><path /></svg>',
    // Parts on different lines are not this rule's concern.
    '<svg\n    width="24"\n    >\n<path\n/></svg>',
  ],
  invalid: [
    {
      code: '<svg  width="24"\theight = "24" ><path d="M1 2"/><path  /><circle/></svg >',
      output: '<svg width="24" height="24"><path d="M1 2" /><path /><circle /></svg>',
      errors: [
        {
          message: 'Expected a single space before attribute "width".',
          column: 5,
          endColumn: 7,
        },
        { message: 'Expected a single space before attribute "height".', column: 17 },
        {
          message: 'Unexpected whitespace around "=" of attribute "height".',
          column: 24,
          endColumn: 27,
        },
        { message: 'Unexpected whitespace before ">".', column: 31, endColumn: 32 },
        // Nothing separates these two, so the `/>` itself is reported.
        { message: 'Expected a single space before "/>".', column: 47, endColumn: 49 },
        { message: 'Expected a single space before "/>".', column: 54, endColumn: 56 },
        { message: 'Expected a single space before "/>".', column: 65 },
        { message: 'Unexpected whitespace in closing tag </svg>.', column: 67, endColumn: 74 },
      ],
    },
    {
      // A line break around "=" is still this rule's concern, not a multi-line value.
      code: '<svg><path d\n=\n"M1 2" /></svg>',
      output: '<svg><path d="M1 2" /></svg>',
      errors: [{ messageId: 'aroundEquals', data: { name: 'd' }, line: 1, endLine: 3 }],
    },
  ],
});

{
  const options = [{ multiline: ['svg'] }];

  ruleTester.run('attrs-newline', svg.rules['attrs-newline'], {
    valid: [
      { code: heart, options },
      { code: '<svg>\n  <path />\n</svg>', options },
      // Without options every tag has to fit on one line.
      '<svg width="24" height="24"><path d="M1 2" /></svg>',
      // Line breaks around "=" are left to `attrs-spacing`.
      '<svg><path d\n=\n"M1 2" /></svg>',
    ],
    invalid: [
      {
        code: '<svg width="24"\n  height="24" viewBox="0 0 24 24">\n</svg>',
        output: '<svg\nwidth="24"\n  height="24"\nviewBox="0 0 24 24"\n>\n</svg>',
        options,
        errors: [
          {
            message: 'Attribute "width" of <svg> must be on its own line.',
            line: 1,
            column: 6,
            endColumn: 16,
          },
          { message: 'Attribute "viewBox" of <svg> must be on its own line.', line: 2 },
          {
            message: 'Closing bracket of <svg> must be on its own line.',
            line: 2,
            column: 34,
            endColumn: 35,
          },
        ],
      },
      {
        code: '<svg>\n  <path\n    d="M1 2"\n  />\n  <g\n    id="a"\n  >\n  </g>\n</svg>',
        output: '<svg>\n  <path d="M1 2" />\n  <g id="a">\n  </g>\n</svg>',
        options,
        errors: [
          { message: 'Attribute "d" must be on the same line as <path>.', line: 3, column: 5 },
          { message: 'Closing bracket must be on the same line as <path>.', line: 4, column: 3 },
          { message: 'Attribute "id" must be on the same line as <g>.', line: 6 },
          { message: 'Closing bracket must be on the same line as <g>.', line: 7 },
        ],
      },
      {
        // A line break inside a value can't be fixed without knowing what the value means.
        code: '<svg>\n  <path d="M1 2\n    3 4" />\n</svg>',
        output: null,
        options,
        errors: [
          {
            message: 'Value of attribute "d" must not contain line breaks.',
            line: 2,
            column: 11,
            endLine: 3,
            endColumn: 9,
          },
        ],
      },
    ],
  });
}

ruleTester.run('self-closing', svg.rules['self-closing'], {
  valid: [
    heart,
    // The root is exempt, and so is anything with content.
    '<svg></svg>',
    '<svg><g><path /></g><title>Heart</title><g><!-- comment --></g></svg>',
  ],
  invalid: [
    {
      code: '<svg><path d="M1 2"></path><circle >\n  </circle></svg>',
      output: '<svg><path d="M1 2" /><circle /></svg>',
      errors: [
        {
          message: 'Empty <path> must be self-closing: write "/>" instead of "></path>".',
          line: 1,
          column: 20,
          endColumn: 28,
        },
        { messageId: 'selfClose', data: { name: 'circle' }, line: 1, column: 36, endLine: 2 },
      ],
    },
  ],
});

ruleTester.run('element-newline', svg.rules['element-newline'], {
  valid: [heart, '<svg />', '<svg>\n</svg>', '<svg></svg>', '<!-- comment -->\n<svg />'],
  invalid: [
    {
      code: '<svg><path /> <circle />\n  <rect /></svg>',
      output: '<svg>\n<path />\n<circle />\n  <rect />\n</svg>',
      errors: [
        { message: 'Expected a line break before <path>.', line: 1, column: 6, endColumn: 14 },
        { message: 'Expected a line break before <circle>.', line: 1, column: 15 },
        { message: 'Expected a line break before </svg>.', line: 2, column: 11, endColumn: 17 },
      ],
    },
    {
      code: '<!-- a --><svg>\n  <path />text<!-- b -->\n</svg>',
      output: '<!-- a -->\n<svg>\n  <path />text\n<!-- b -->\n</svg>',
      errors: [
        { message: 'Expected a line break before <svg>.', line: 1 },
        { message: 'Expected a line break before comment.', line: 2 },
      ],
    },
  ],
});
