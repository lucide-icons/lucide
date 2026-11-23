import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { parseForESLint } from './parser.mjs';

const parse = (/** @type {string} */ text) => parseForESLint(text).ast;

/** Assert that parsing fails with `message` at the given 1-based line and column. */
const assertFails = (
  /** @type {string} */ text,
  /** @type {RegExp} */ message,
  /** @type {number} */ line,
  /** @type {number} */ column,
) => {
  assert.throws(
    () => parse(text),
    (/** @type {any} */ error) => {
      assert.match(error.message, message);
      assert.deepEqual([error.lineNumber, error.column], [line, column]);
      return true;
    },
  );
};

describe('svg parser', () => {
  it('parses elements, attributes and their locations', () => {
    const text = '<svg width="24">\n  <path d=\'M1 2\' />\n</svg>\n';
    const { body } = parse(text);
    const [svg, trailingText] = body;

    assert.equal(svg.type, 'Element');
    assert.equal(svg.name, 'svg');
    assert.equal(svg.selfClosing, false);
    assert.deepEqual(svg.range, [0, text.length - 1]);
    assert.deepEqual(svg.loc, { start: { line: 1, column: 0 }, end: { line: 3, column: 6 } });
    assert.equal(text.slice(...svg.openStart.range), '<svg');
    assert.equal(text.slice(...svg.openEnd.range), '>');
    assert.equal(text.slice(...svg.close.range), '</svg>');
    assert.deepEqual(trailingText, {
      type: 'Text',
      value: '\n',
      range: [text.length - 1, text.length],
      loc: { start: { line: 3, column: 6 }, end: { line: 4, column: 0 } },
    });

    const [width] = svg.attributes;
    assert.deepEqual(
      [width.name, width.value, width.quote, text.slice(...width.range)],
      ['width', '24', '"', 'width="24"'],
    );

    const [, path] = svg.children;
    assert.equal(path.name, 'path');
    assert.equal(path.selfClosing, true);
    assert.equal(path.close, null);
    assert.equal(text.slice(...path.openEnd.range), '/>');
    assert.deepEqual(path.loc, { start: { line: 2, column: 2 }, end: { line: 2, column: 19 } });

    const [d] = path.attributes;
    assert.deepEqual([d.value, d.quote], ['M1 2', "'"]);
    assert.equal(text.slice(...d.key.range), 'd');
    assert.equal(text.slice(...d.literal.range), "'M1 2'");
  });

  it('keeps text, CDATA, comments, doctypes and processing instructions as nodes', () => {
    const { body } = parse(
      '<?xml version="1.0"?><!DOCTYPE svg [<!ENTITY a ">">]><svg>a &amp; b<!-- c --><![CDATA[<d>]]></svg>',
    );
    const [declaration, doctype, svg] = body;

    assert.deepEqual(
      [declaration.type, declaration.value],
      ['ProcessingInstruction', 'xml version="1.0"'],
    );
    assert.deepEqual([doctype.type, doctype.value], ['Doctype', ' svg [<!ENTITY a ">">]']);
    assert.deepEqual(
      svg.children.map((/** @type {any} */ node) => [node.type, node.value]),
      [
        ['Text', 'a &amp; b'],
        ['Comment', ' c '],
        ['CData', '<d>'],
      ],
    );
  });

  it('allows whitespace around "=" and in closing tags', () => {
    const [svg] = parse('<svg a = "1"\n></svg  >').body;
    assert.equal(svg.attributes[0].value, '1');
    assert.equal(svg.close.name, 'svg');
  });

  it('counts CRLF as a single line break', () => {
    const [svg] = parse('<svg>\r\n  <path />\r\n</svg>').body;
    assert.deepEqual(svg.children[1].loc.start, { line: 2, column: 2 });
    assert.deepEqual(svg.loc.end, { line: 3, column: 6 });
  });

  it('rejects tags that are not closed or do not match', () => {
    assertFails(
      '<svg>\n  <path>\n</svg>',
      /Unexpected closing tag <\/svg>: expected <\/path>/,
      3,
      1,
    );
    assertFails('<svg>\n  <path />\n', /<svg> is never closed; expected <\/svg>/, 1, 1);
    assertFails('<svg></svg>\n</svg>', /Unexpected closing tag <\/svg>: no element is open/, 2, 1);
    assertFails('<svg><path d="M1 2"', /<path> tag is never closed with ">"/, 1, 6);
    assertFails('<svg></svg', /Closing tag <\/svg> is missing its ">"/, 1, 6);
    assertFails('<svg>< path /></svg>', /Expected a tag name after "<"/, 1, 6);
    assertFails('<svg><!-- a</svg>', /Comment is never closed with "-->"/, 1, 6);
  });

  it('rejects malformed attributes', () => {
    assertFails('<svg width></svg>', /Attribute "width" has no value/, 1, 6);
    assertFails('<svg width=24></svg>', /Value of attribute "width" must be quoted/, 1, 12);
    assertFails(
      '<svg width="24></svg>',
      /Value of attribute "width" is never closed with "/,
      1,
      12,
    );
    assertFails('<svg a="1"b="2"></svg>', /Expected whitespace before attribute "b"/, 1, 11);
    assertFails('<svg a="<"></svg>', /Unescaped "<" in attribute value/, 1, 9);
    assertFails('<svg\n  "a"></svg>', /Unexpected character "\\"" in <svg> tag/, 2, 3);
  });

  it('rejects an "&" that does not start a reference', () => {
    assertFails('<svg a="b & c" />', /Unescaped "&"/, 1, 11);
    assertFails('<svg>b &c</svg>', /Unescaped "&"/, 1, 8);
    assert.doesNotThrow(() => parse('<svg a="&amp;&#38;&#x26;" />'));
  });

  it('requires exactly one root element', () => {
    assertFails('', /Expected a root element/, 1, 1);
    assertFails('just text\n', /Expected a root element/, 1, 1);
    assertFails('<svg />\n<svg />', /Unexpected second root element <svg>/, 2, 1);
  });
});
