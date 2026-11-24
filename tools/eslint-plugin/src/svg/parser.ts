import { SaxesParser } from 'saxes';

/**
 * ESLint parser for SVG files.
 *
 * The parsing itself is done by saxes. It is a strict XML parser, so unlike an HTML parser it does
 * not recover from mistakes: a tag that is never closed, a mismatched closing tag or a duplicate or
 * unquoted attribute is a parsing error. All that is left to do here is to turn its events into a
 * tree ESLint can traverse, and to work out where everything is so that rules can point at it.
 */

export interface Position {
  line: number;
  column: number;
}

export interface Located {
  range: [number, number];
  loc: { start: Position; end: Position };
}

export interface Attribute extends Located {
  type: 'Attribute';
  name: string;
  /** Text between the quotes, with references such as `&amp;` left as is. */
  value: string;
  quote: '"' | "'";
  /** The value including its quotes. */
  literal: Located;
}

export interface Element extends Located {
  type: 'Element';
  name: string;
  attributes: Attribute[];
  children: ChildNode[];
  /** `<name` */
  openStart: Located;
}

export interface Text extends Located {
  type: 'Text';
  value: string;
}

/** Markup that is neither an element nor text. */
export interface Other extends Located {
  type: 'CData' | 'Comment' | 'Doctype' | 'ProcessingInstruction';
}

export type ChildNode = Element | Text | Other;

export interface Program extends Located {
  type: 'Program';
  body: ChildNode[];
  sourceType: 'module';
  tokens: never[];
  comments: never[];
}

export const meta = { name: 'lucide-svg-parser', version: '2.0.0' };

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

// The same line breaks ESLint splits `sourceCode.lines` on, so positions agree.
const LINE_BREAK = /\r\n|[\r\n\u2028\u2029]/gu;

export function parseForESLint(text: string): { ast: Program; visitorKeys: typeof visitorKeys } {
  const lineStarts = [0];
  for (const lineBreak of text.matchAll(LINE_BREAK)) {
    lineStarts.push(lineBreak.index + lineBreak[0].length);
  }

  const positionAt = (index: number): Position => {
    let low = 0;
    let high = lineStarts.length - 1;
    while (low < high) {
      const middle = Math.ceil((low + high) / 2);
      if (lineStarts[middle] <= index) low = middle;
      else high = middle - 1;
    }
    return { line: low + 1, column: index - lineStarts[low] };
  };

  const span = (start: number, end: number): Located => ({
    range: [start, end],
    loc: { start: positionAt(start), end: positionAt(end) },
  });

  // saxes reports what it found, not where. But `parser.position` is how far it has read, which
  // during an event is the end of what the event is about, and the rest follows from that.
  const parser = new SaxesParser();

  const body: ChildNode[] = [];
  const openElements: Element[] = [];
  let attributes: Attribute[] = [];
  // Where the last piece of markup ended.
  let end = 0;

  const append = (node: ChildNode) => (openElements.at(-1)?.children ?? body).push(node);

  /**
   * Locate the piece of markup that ends at `stop`. Text can't contain a `<`, so the markup starts
   * at the first one after the previous piece, and whatever lies in between is text.
   */
  const markup = (stop = parser.position) => {
    const start = text.indexOf('<', end);
    if (start > end) append({ type: 'Text', value: text.slice(end, start), ...span(end, start) });
    end = stop;
    return span(start, stop);
  };

  parser.on('error', (error) => {
    // saxes puts the position in front of its message, ESLint reports it separately.
    const message = error.message.replace(/^\d+:\d+: /, '');
    const { line, column } = positionAt(Math.min(parser.position, text.length));
    throw Object.assign(new SyntaxError(message[0].toUpperCase() + message.slice(1)), {
      // ESLint reads the location of a parsing error from these two, both 1-based.
      lineNumber: line,
      column: column + 1,
    });
  });

  parser.on('attribute', ({ name }) => {
    const stop = parser.position;
    const quote = text[stop - 1] as Attribute['quote'];
    const quoteAt = text.lastIndexOf(quote, stop - 2);
    // Walk back over `name = ` to where the attribute starts.
    let start = quoteAt;
    while (/[ \t\r\n=]/.test(text[start - 1])) start--;
    start -= name.length;

    attributes.push({
      type: 'Attribute',
      name,
      value: text.slice(quoteAt + 1, stop - 1),
      quote,
      literal: span(quoteAt, stop),
      ...span(start, stop),
    });
  });

  parser.on('opentag', ({ name }) => {
    const located = markup();
    const [start] = located.range;
    const element: Element = {
      type: 'Element',
      name,
      attributes,
      children: [],
      openStart: span(start, start + 1 + name.length),
      ...located,
    };
    attributes = [];
    append(element);
    openElements.push(element);
  });

  parser.on('closetag', ({ isSelfClosing }) => {
    const element = openElements.at(-1);
    // `<path />` was already covered by its opening tag. Otherwise the element runs up to the end
    // of the closing tag, and any text in front of that tag still belongs to it.
    if (element && !isSelfClosing) {
      markup();
      element.range[1] = end;
      element.loc.end = positionAt(end);
    }
    openElements.pop();
  });

  // Everything else only has to be told apart from text.
  const other =
    (type: Other['type'], extra = 0) =>
    () => {
      append({ type, ...markup(parser.position + extra) });
    };
  // saxes reports a comment one character early, before its final `>`.
  parser.on('comment', other('Comment', 1));
  parser.on('cdata', other('CData'));
  parser.on('doctype', other('Doctype'));
  parser.on('processinginstruction', other('ProcessingInstruction'));
  parser.on('xmldecl', other('ProcessingInstruction'));

  parser.write(text).close();
  if (end < text.length)
    append({ type: 'Text', value: text.slice(end), ...span(end, text.length) });

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
