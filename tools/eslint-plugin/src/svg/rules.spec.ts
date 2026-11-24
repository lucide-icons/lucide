import { RuleTester } from 'eslint';
import { describe, it } from 'vitest';
import svg from './index.ts';

RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.itOnly = it.only;

const ruleTester = new RuleTester({ languageOptions: { parser: svg.parser } });

/** An icon in the canonical format, with the given lines inside its `<svg>`. */
const icon = (...lines: string[]) =>
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
      // Reported as one problem, without the whitespace around it.
      code: '<svg>\n  stray\n  text   here\n</svg>\n',
      errors: [
        {
          messageId: 'text',
          data: { text: 'stray text here' },
          line: 2,
          column: 3,
          endLine: 3,
          endColumn: 14,
        },
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
