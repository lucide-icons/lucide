import { describe, expect, it } from 'vitest';
import { type ChildNode, type Element, type Located, parseForESLint } from './parser.ts';

const parse = (text: string) => parseForESLint(text).ast;

/** The root element of a file, or any other node that has to be an element. */
const element = (node: ChildNode | undefined): Element => {
  if (node?.type !== 'Element') throw new Error(`Expected an element, found ${node?.type}`);
  return node;
};

/** The node types in a list of nodes, each with the source text its range covers. */
const sources = (text: string, nodes: Array<Located & { type: string }>) =>
  nodes.map((node) => [node.type, text.slice(...node.range)]);

/** Expect parsing to fail with `message` on the given 1-based line. */
const expectFailure = (text: string, message: RegExp, line: number) => {
  let failure: unknown;
  try {
    parse(text);
  } catch (error) {
    failure = error;
  }
  expect(failure).toBeInstanceOf(SyntaxError);
  expect(failure).toMatchObject({
    message: expect.stringMatching(message),
    lineNumber: line,
    column: expect.any(Number),
  });
};

describe('svg parser', () => {
  it('parses elements, attributes and their locations', () => {
    const text = '<svg width="24">\n  <path d = \'M1 2\' />\n</svg>\n';
    const program = parse(text);
    const svg = element(program.body[0]);

    expect(program.range).toEqual([0, text.length]);
    expect(svg.name).toBe('svg');
    expect(svg.range).toEqual([0, text.length - 1]);
    expect(svg.loc).toEqual({ start: { line: 1, column: 0 }, end: { line: 3, column: 6 } });
    expect(text.slice(...svg.openStart.range)).toBe('<svg');
    expect(program.body[1]).toEqual({
      type: 'Text',
      value: '\n',
      range: [text.length - 1, text.length],
      loc: { start: { line: 3, column: 6 }, end: { line: 4, column: 0 } },
    });

    const [width] = svg.attributes;
    expect([width.name, width.value, width.quote]).toEqual(['width', '24', '"']);
    expect(text.slice(...width.range)).toBe('width="24"');
    expect(text.slice(...width.literal.range)).toBe('"24"');
    expect(width.loc).toEqual({ start: { line: 1, column: 5 }, end: { line: 1, column: 15 } });

    expect(sources(text, svg.children)).toEqual([
      ['Text', '\n  '],
      ['Element', "<path d = 'M1 2' />"],
      ['Text', '\n'],
    ]);

    const path = element(svg.children[1]);
    expect(path.name).toBe('path');
    expect(path.children).toEqual([]);
    expect(text.slice(...path.openStart.range)).toBe('<path');
    expect(path.loc).toEqual({ start: { line: 2, column: 2 }, end: { line: 2, column: 21 } });

    // Whitespace around "=" belongs to the attribute, the quotes belong to its literal.
    const [d] = path.attributes;
    expect([d.name, d.value, d.quote]).toEqual(['d', 'M1 2', "'"]);
    expect(text.slice(...d.range)).toBe("d = 'M1 2'");
    expect(text.slice(...d.literal.range)).toBe("'M1 2'");
  });

  it('tells comments, CDATA, doctypes and processing instructions apart from text', () => {
    const text =
      '<?xml version="1.0"?>\n<!DOCTYPE svg>\n<!-- a --><svg>b &amp; c<!-- d --><![CDATA[<e>]]><?f g?> </svg>';
    const { body } = parse(text);

    expect(sources(text, body.slice(0, -1))).toEqual([
      ['ProcessingInstruction', '<?xml version="1.0"?>'],
      ['Text', '\n'],
      ['Doctype', '<!DOCTYPE svg>'],
      ['Text', '\n'],
      ['Comment', '<!-- a -->'],
    ]);
    expect(sources(text, element(body.at(-1)).children)).toEqual([
      ['Text', 'b &amp; c'],
      ['Comment', '<!-- d -->'],
      ['CData', '<![CDATA[<e>]]>'],
      ['ProcessingInstruction', '<?f g?>'],
      ['Text', ' '],
    ]);
  });

  it('keeps text in the element it is in', () => {
    const text = '<svg><g>a<path />b</g>c</svg>';
    const svg = element(parse(text).body[0]);

    expect(sources(text, element(svg.children[0]).children)).toEqual([
      ['Text', 'a'],
      ['Element', '<path />'],
      ['Text', 'b'],
    ]);
    expect(sources(text, svg.children)).toEqual([
      ['Element', '<g>a<path />b</g>'],
      ['Text', 'c'],
    ]);
  });

  it('counts CRLF as a single line break', () => {
    const svg = element(parse('<svg>\r\n  <path />\r\n</svg>').body[0]);
    expect(svg.children[1].loc.start).toEqual({ line: 2, column: 2 });
    expect(svg.loc.end).toEqual({ line: 3, column: 6 });
  });

  it('counts characters outside the BMP the way string indices do', () => {
    const emoji = String.fromCodePoint(0x1f600);
    const text = `<svg>${emoji}<path a="" /></svg>`;
    const svg = element(parse(text).body[0]);

    expect(sources(text, svg.children)).toEqual([
      ['Text', emoji],
      ['Element', '<path a="" />'],
    ]);
    expect(text.slice(...element(svg.children[1]).attributes[0].range)).toBe('a=""');
  });

  it('rejects tags that are not closed or do not match', () => {
    expectFailure('<svg>\n  <path>\n</svg>', /^Unexpected close tag/, 3);
    expectFailure('<svg>\n  <path />\n', /^Unclosed tag: svg/, 3);
    expectFailure('<svg></svg>\n</svg>', /^Unmatched closing tag: svg/, 2);
    expectFailure('<svg>\n<!-- a</svg>', /^Unclosed tag: svg/, 2);
    expectFailure('<svg>\n< path /></svg>', /^Disallowed character in tag name/, 2);
  });

  it('rejects malformed attributes', () => {
    expectFailure('<svg width></svg>', /^Attribute without value/, 1);
    expectFailure('<svg width=24></svg>', /^Unquoted attribute value/, 1);
    expectFailure('<svg a="1"b="2"></svg>', /^No whitespace between attributes/, 1);
    expectFailure('<svg a="<"></svg>', /^Disallowed character/, 1);
    expectFailure('<svg\n  "a"></svg>', /^Disallowed character in attribute name/, 2);
    // Reported where the tag ends.
    expectFailure('<svg\n  a="1"\n  a="2"\n/>', /^Duplicate attribute: a/, 4);
  });

  it('rejects references that do not exist', () => {
    expectFailure('<svg>&foo;</svg>', /^Undefined entity/, 1);
    expect(() => parse('<svg a="&amp;&#38;&#x26;" />')).not.toThrow();
  });

  it('requires exactly one root element with no text around it', () => {
    expectFailure('', /^Document must contain a root element/, 1);
    expectFailure('<svg />\n<svg />', /^Documents may contain only one root/, 2);
    expectFailure('text\n<svg />', /^Text data outside of root node/, 2);
    expectFailure('<svg />\ntext\n', /^Text data outside of root node/, 3);
    expect(() => parse('\n<svg />\n')).not.toThrow();
  });
});
