/**
 * ESLint parser for SVG files.
 *
 * SVG is XML, so unlike an HTML parser this one does not recover from mistakes: a tag that is never
 * closed, a mismatched closing tag or a malformed attribute is a parsing error. Things a rule can
 * report more helpfully (stray text, duplicate attributes, single quotes) are kept in the tree.
 *
 * Every node, and every part of a tag a rule may want to point at, carries its exact `range` and
 * `loc`, which is what the formatting rules are built on.
 *
 * @typedef {{ line: number, column: number }} Position
 * @typedef {{ range: [number, number], loc: { start: Position, end: Position } }} Located
 *
 * @typedef {Located & {
 *   type: 'Attribute',
 *   name: string,
 *   value: string,         // Text between the quotes, with references such as `&amp;` left as is.
 *   quote: '"' | "'",
 *   key: Located,          // The attribute name.
 *   literal: Located,      // The value including its quotes.
 * }} Attribute
 *
 * @typedef {Located & {
 *   type: 'Element',
 *   name: string,
 *   attributes: Attribute[],
 *   children: ChildNode[],
 *   selfClosing: boolean,
 *   openStart: Located,                        // `<name`
 *   openEnd: Located,                          // `>` or `/>`
 *   close: (Located & { name: string }) | null // `</name>`, null when self-closing.
 * }} Element
 *
 * @typedef {Located & { type: 'Text' | 'CData' | 'Comment' | 'Doctype' | 'ProcessingInstruction', value: string }} CharacterData
 * @typedef {Element | CharacterData} ChildNode
 */

export const meta = { name: 'lucide-svg-parser', version: '1.0.0' };

export const visitorKeys = {
  Program: ['body'],
  Element: ['attributes', 'children'],
  Attribute: [],
  Text: [],
  CData: [],
  Comment: [],
  Doctype: [],
  ProcessingInstruction: [],
};

// The `y` (sticky) flag makes these match at exactly `lastIndex`.
const SPACE = /[ \t\r\n]*/y;
const NAME = /[A-Za-z_:][\w.:-]*/y;
const REFERENCE = /&(?:#\d+|#x[\da-fA-F]+|[A-Za-z_:][\w.:-]*);/y;
// The same line breaks ESLint splits `sourceCode.lines` on, so positions agree.
const LINE_BREAK = /\r\n|[\r\n\u2028\u2029]/gu;

class SvgSyntaxError extends SyntaxError {
  /**
   * @param {string} message
   * @param {number} index
   * @param {Position} position
   */
  constructor(message, index, position) {
    super(message);
    this.index = index;
    // ESLint reads the location of a parsing error from these two, both 1-based.
    this.lineNumber = position.line;
    this.column = position.column + 1;
  }
}

/**
 * @param {string} text
 * @returns {{ ast: any, visitorKeys: typeof visitorKeys }}
 */
export function parseForESLint(text) {
  const lineStarts = [0];
  for (const lineBreak of text.matchAll(LINE_BREAK)) {
    lineStarts.push(lineBreak.index + lineBreak[0].length);
  }

  /** @returns {Position} */
  const positionAt = (/** @type {number} */ index) => {
    let low = 0;
    let high = lineStarts.length - 1;
    while (low < high) {
      const middle = Math.ceil((low + high) / 2);
      if (lineStarts[middle] <= index) low = middle;
      else high = middle - 1;
    }
    return { line: low + 1, column: index - lineStarts[low] };
  };

  /** @returns {Located} */
  const span = (/** @type {number} */ start, /** @type {number} */ end) => ({
    range: [start, end],
    loc: { start: positionAt(start), end: positionAt(end) },
  });

  /** @returns {never} */
  const fail = (/** @type {string} */ message, /** @type {number} */ index) => {
    throw new SvgSyntaxError(message, index, positionAt(index));
  };

  const matchAt = (/** @type {RegExp} */ pattern, /** @type {number} */ index) => {
    pattern.lastIndex = index;
    return pattern.exec(text)?.[0] ?? null;
  };

  const skipSpace = (/** @type {number} */ index) => index + (matchAt(SPACE, index) ?? '').length;

  /** Every `&` in XML has to start a reference such as `&amp;` or `&#38;`. */
  const checkReferences = (/** @type {number} */ start, /** @type {number} */ end) => {
    for (let at = text.indexOf('&', start); at !== -1 && at < end; at = text.indexOf('&', at + 1)) {
      if (matchAt(REFERENCE, at) === null) fail('Unescaped "&"; write it as "&amp;".', at);
    }
  };

  /** Find the end of `start…terminator`, e.g. of a comment. */
  const endOf = (
    /** @type {number} */ start,
    /** @type {string} */ terminator,
    /** @type {string} */ what,
  ) => {
    const at = text.indexOf(terminator, start);
    if (at === -1) fail(`${what} is never closed with "${terminator}".`, start);
    return at + terminator.length;
  };

  /** A doctype may contain quoted strings and a bracketed subset, both of which can hold a `>`. */
  const endOfDoctype = (/** @type {number} */ start) => {
    let quote = null;
    let depth = 0;
    for (let at = start; at < text.length; at++) {
      const char = text[at];
      if (quote) {
        if (char === quote) quote = null;
      } else if (char === '"' || char === "'") quote = char;
      else if (char === '[') depth++;
      else if (char === ']') depth--;
      else if (char === '>' && depth <= 0) return at + 1;
    }
    return fail('Doctype is never closed with ">".', start);
  };

  /** @type {ChildNode[]} */
  const body = [];
  /** @type {Element[]} */
  const openElements = [];
  const append = (/** @type {ChildNode} */ node) =>
    (openElements.at(-1)?.children ?? body).push(node);

  /** Parse `<name attr="value" …>` or `<name … />` starting at `start`; returns where it ends. */
  const parseOpenTag = (/** @type {number} */ start) => {
    const name = matchAt(NAME, start + 1);
    if (name === null) return fail('Expected a tag name after "<".', start);

    let index = start + 1 + name.length;
    /** @type {Attribute[]} */
    const attributes = [];
    let selfClosing = false;
    /** @type {Located} */
    let openEnd;

    for (;;) {
      const at = skipSpace(index);
      if (at >= text.length) fail(`<${name}> tag is never closed with ">".`, start);
      if (text[at] === '>') {
        openEnd = span(at, at + 1);
        break;
      }
      if (text.startsWith('/>', at)) {
        selfClosing = true;
        openEnd = span(at, at + 2);
        break;
      }

      const attributeName = matchAt(NAME, at);
      if (attributeName === null) {
        return fail(`Unexpected character ${JSON.stringify(text[at])} in <${name}> tag.`, at);
      }
      if (at === index) fail(`Expected whitespace before attribute "${attributeName}".`, at);

      const keyEnd = at + attributeName.length;
      const equals = skipSpace(keyEnd);
      if (text[equals] !== '=') fail(`Attribute "${attributeName}" has no value.`, at);

      const quoteAt = skipSpace(equals + 1);
      const quote = text[quoteAt];
      if (quote !== '"' && quote !== "'") {
        return fail(`Value of attribute "${attributeName}" must be quoted.`, quoteAt);
      }
      const valueEnd = text.indexOf(quote, quoteAt + 1);
      if (valueEnd === -1) {
        fail(`Value of attribute "${attributeName}" is never closed with ${quote}.`, quoteAt);
      }
      const lessThan = text.indexOf('<', quoteAt + 1);
      if (lessThan !== -1 && lessThan < valueEnd) {
        fail('Unescaped "<" in attribute value; write it as "&lt;".', lessThan);
      }
      checkReferences(quoteAt + 1, valueEnd);

      index = valueEnd + 1;
      attributes.push({
        type: 'Attribute',
        name: attributeName,
        value: text.slice(quoteAt + 1, valueEnd),
        quote,
        key: span(at, keyEnd),
        literal: span(quoteAt, index),
        ...span(at, index),
      });
    }

    /** @type {Element} */
    const element = {
      type: 'Element',
      name,
      attributes,
      children: [],
      selfClosing,
      openStart: span(start, start + 1 + name.length),
      openEnd,
      close: null,
      ...span(start, openEnd.range[1]),
    };
    append(element);
    if (!selfClosing) openElements.push(element);
    return openEnd.range[1];
  };

  /** Parse `</name>` starting at `start`; returns where it ends. */
  const parseCloseTag = (/** @type {number} */ start) => {
    const name = matchAt(NAME, start + 2);
    if (name === null) return fail('Expected a tag name after "</".', start);
    const bracket = skipSpace(start + 2 + name.length);
    if (text[bracket] !== '>') fail(`Closing tag </${name}> is missing its ">".`, start);

    const element = openElements.pop();
    if (!element) return fail(`Unexpected closing tag </${name}>: no element is open.`, start);
    if (element.name !== name) {
      fail(
        `Unexpected closing tag </${name}>: expected </${element.name}> to close the <${element.name}> opened on line ${element.loc.start.line}.`,
        start,
      );
    }

    const end = bracket + 1;
    element.close = { name, ...span(start, end) };
    element.range[1] = end;
    element.loc.end = positionAt(end);
    return end;
  };

  let index = 0;
  while (index < text.length) {
    const start = index;

    if (text[index] !== '<') {
      const next = text.indexOf('<', index);
      index = next === -1 ? text.length : next;
      checkReferences(start, index);
      append({ type: 'Text', value: text.slice(start, index), ...span(start, index) });
    } else if (text.startsWith('<!--', index)) {
      index = endOf(start, '-->', 'Comment');
      append({ type: 'Comment', value: text.slice(start + 4, index - 3), ...span(start, index) });
    } else if (text.startsWith('<![CDATA[', index)) {
      index = endOf(start, ']]>', 'CDATA section');
      append({ type: 'CData', value: text.slice(start + 9, index - 3), ...span(start, index) });
    } else if (text.startsWith('<!DOCTYPE', index)) {
      index = endOfDoctype(start);
      append({ type: 'Doctype', value: text.slice(start + 9, index - 1), ...span(start, index) });
    } else if (text.startsWith('<?', index)) {
      index = endOf(start, '?>', 'Processing instruction');
      append({
        type: 'ProcessingInstruction',
        value: text.slice(start + 2, index - 2),
        ...span(start, index),
      });
    } else if (text.startsWith('</', index)) {
      index = parseCloseTag(start);
    } else {
      index = parseOpenTag(start);
    }
  }

  const unclosed = openElements.at(-1);
  if (unclosed) {
    fail(`<${unclosed.name}> is never closed; expected </${unclosed.name}>.`, unclosed.range[0]);
  }

  const roots = body.filter((node) => node.type === 'Element');
  if (roots.length === 0) fail('Expected a root element.', 0);
  if (roots.length > 1) {
    fail(
      `Unexpected second root element <${roots[1].name}>; a file must have exactly one.`,
      roots[1].range[0],
    );
  }

  return {
    ast: {
      type: 'Program',
      body,
      sourceType: 'module',
      // Rules work on the nodes above, so there is no need for a token stream. Leaving comments
      // out also means a file can't switch rules off with `<!-- eslint-disable -->`.
      tokens: [],
      comments: [],
      ...span(0, text.length),
    },
    visitorKeys,
  };
}
