import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { parseForESLint } from './parser.mjs';

const parse = (/** @type {string} */ text) => parseForESLint(text).ast;

/** The node types in a list of nodes, each with the source text its range covers. */
const sources = (/** @type {string} */ text, /** @type {any[]} */ nodes) =>
  nodes.map((node) => [node.type, text.slice(...node.range)]);

/** Assert that parsing fails with `message` on the given 1-based line. */
const assertFails = (
  /** @type {string} */ text,
  /** @type {RegExp} */ message,
  /** @type {number} */ line,
) => {
  assert.throws(
    () => parse(text),
    (/** @type {any} */ error) => {
      assert.match(error.message, message);
      assert.equal(error.lineNumber, line);
      assert.ok(error.column >= 1);
      return true;
    },
  );
};

describe('svg parser', () => {
  it('parses elements, attributes and their locations', () => {
    const text = '<svg width="24">\n  <path d = \'M1 2\' />\n</svg>\n';
    const program = parse(text);
    const [svg, trailingText] = program.body;

    assert.deepEqual(program.range, [0, text.length]);
    assert.equal(svg.type, 'Element');
    assert.equal(svg.name, 'svg');
    assert.deepEqual(svg.range, [0, text.length - 1]);
    assert.deepEqual(svg.loc, { start: { line: 1, column: 0 }, end: { line: 3, column: 6 } });
    assert.equal(text.slice(...svg.openStart.range), '<svg');
    assert.deepEqual(trailingText, {
      type: 'Text',
      value: '\n',
      range: [text.length - 1, text.length],
      loc: { start: { line: 3, column: 6 }, end: { line: 4, column: 0 } },
    });

    const [width] = svg.attributes;
    assert.deepEqual([width.name, width.value, width.quote], ['width', '24', '"']);
    assert.equal(text.slice(...width.range), 'width="24"');
    assert.equal(text.slice(...width.literal.range), '"24"');
    assert.deepEqual(width.loc, { start: { line: 1, column: 5 }, end: { line: 1, column: 15 } });

    assert.deepEqual(sources(text, svg.children), [
      ['Text', '\n  '],
      ['Element', "<path d = 'M1 2' />"],
      ['Text', '\n'],
    ]);

    const path = svg.children[1];
    assert.equal(path.name, 'path');
    assert.deepEqual(path.children, []);
    assert.equal(text.slice(...path.openStart.range), '<path');
    assert.deepEqual(path.loc, { start: { line: 2, column: 2 }, end: { line: 2, column: 21 } });

    // Whitespace around "=" belongs to the attribute, the quotes belong to its literal.
    const [d] = path.attributes;
    assert.deepEqual([d.name, d.value, d.quote], ['d', 'M1 2', "'"]);
    assert.equal(text.slice(...d.range), "d = 'M1 2'");
    assert.equal(text.slice(...d.literal.range), "'M1 2'");
  });

  it('tells comments, CDATA, doctypes and processing instructions apart from text', () => {
    const text =
      '<?xml version="1.0"?>\n<!DOCTYPE svg>\n<!-- a --><svg>b &amp; c<!-- d --><![CDATA[<e>]]><?f g?> </svg>';
    const { body } = parse(text);

    assert.deepEqual(sources(text, body.slice(0, -1)), [
      ['ProcessingInstruction', '<?xml version="1.0"?>'],
      ['Text', '\n'],
      ['Doctype', '<!DOCTYPE svg>'],
      ['Text', '\n'],
      ['Comment', '<!-- a -->'],
    ]);
    assert.deepEqual(sources(text, body.at(-1).children), [
      ['Text', 'b &amp; c'],
      ['Comment', '<!-- d -->'],
      ['CData', '<![CDATA[<e>]]>'],
      ['ProcessingInstruction', '<?f g?>'],
      ['Text', ' '],
    ]);
  });

  it('keeps text in the element it is in', () => {
    const text = '<svg><g>a<path />b</g>c</svg>';
    const [svg] = parse(text).body;
    const [g, c] = svg.children;

    assert.deepEqual(sources(text, g.children), [
      ['Text', 'a'],
      ['Element', '<path />'],
      ['Text', 'b'],
    ]);
    assert.deepEqual(sources(text, [g, c]), [
      ['Element', '<g>a<path />b</g>'],
      ['Text', 'c'],
    ]);
  });

  it('counts CRLF as a single line break', () => {
    const [svg] = parse('<svg>\r\n  <path />\r\n</svg>').body;
    assert.deepEqual(svg.children[1].loc.start, { line: 2, column: 2 });
    assert.deepEqual(svg.loc.end, { line: 3, column: 6 });
  });

  it('counts characters outside the BMP the way string indices do', () => {
    const text = `<svg>${String.fromCodePoint(0x1f600)}<path a="" /></svg>`;
    const [svg] = parse(text).body;
    assert.deepEqual(sources(text, svg.children), [
      ['Text', String.fromCodePoint(0x1f600)],
      ['Element', '<path a="" />'],
    ]);
    assert.equal(text.slice(...svg.children[1].attributes[0].range), 'a=""');
  });

  it('rejects tags that are not closed or do not match', () => {
    assertFails('<svg>\n  <path>\n</svg>', /^Unexpected close tag/, 3);
    assertFails('<svg>\n  <path />\n', /^Unclosed tag: svg/, 3);
    assertFails('<svg></svg>\n</svg>', /^Unmatched closing tag: svg/, 2);
    assertFails('<svg>\n<!-- a</svg>', /^Unclosed tag: svg/, 2);
    assertFails('<svg>\n< path /></svg>', /^Disallowed character in tag name/, 2);
  });

  it('rejects malformed attributes', () => {
    assertFails('<svg width></svg>', /^Attribute without value/, 1);
    assertFails('<svg width=24></svg>', /^Unquoted attribute value/, 1);
    assertFails('<svg a="1"b="2"></svg>', /^No whitespace between attributes/, 1);
    assertFails('<svg a="<"></svg>', /^Disallowed character/, 1);
    assertFails('<svg\n  "a"></svg>', /^Disallowed character in attribute name/, 2);
    // Reported where the tag ends.
    assertFails('<svg\n  a="1"\n  a="2"\n/>', /^Duplicate attribute: a/, 4);
  });

  it('rejects references that do not exist', () => {
    assertFails('<svg>&foo;</svg>', /^Undefined entity/, 1);
    assert.doesNotThrow(() => parse('<svg a="&amp;&#38;&#x26;" />'));
  });

  it('requires exactly one root element with no text around it', () => {
    assertFails('', /^Document must contain a root element/, 1);
    assertFails('<svg />\n<svg />', /^Documents may contain only one root/, 2);
    assertFails('text\n<svg />', /^Text data outside of root node/, 2);
    assertFails('<svg />\ntext\n', /^Text data outside of root node/, 3);
    assert.doesNotThrow(() => parse('\n<svg />\n'));
  });
});
