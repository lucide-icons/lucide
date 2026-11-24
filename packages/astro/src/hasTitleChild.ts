const HTML_VOID_ELEMENTS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

/**
 * Check whether rendered default-slot HTML contains a direct `<title>` element child.
 * Nested `<title>` elements (for example inside a combined child `<svg>`) do not name
 * the outer `<svg>` and are ignored alongside comments and non-title elements.
 */
export function hasTitleChild(slotHtml: string): boolean {
  let depth = 0;
  let i = 0;
  const len = slotHtml.length;

  while (i < len) {
    const lt = slotHtml.indexOf('<', i);
    if (lt === -1) break;

    if (slotHtml.startsWith('<!--', lt)) {
      const end = slotHtml.indexOf('-->', lt + 4);
      i = end === -1 ? len : end + 3;
      continue;
    }

    if (slotHtml.startsWith('<![CDATA[', lt)) {
      const end = slotHtml.indexOf(']]>', lt + 9);
      i = end === -1 ? len : end + 3;
      continue;
    }

    if (slotHtml.startsWith('<!', lt) || slotHtml.startsWith('<?', lt)) {
      const end = slotHtml.indexOf('>', lt + 2);
      i = end === -1 ? len : end + 1;
      continue;
    }

    const isClosing = slotHtml[lt + 1] === '/';
    const nameStart = isClosing ? lt + 2 : lt + 1;
    let nameEnd = nameStart;
    while (nameEnd < len && /[a-zA-Z0-9:-]/.test(slotHtml.charAt(nameEnd))) {
      nameEnd += 1;
    }

    if (nameEnd === nameStart) {
      i = lt + 1;
      continue;
    }

    const tagName = slotHtml.slice(nameStart, nameEnd).toLowerCase();

    let j = nameEnd;
    let quote: string | null = null;
    while (j < len) {
      const ch = slotHtml[j];
      if (quote) {
        if (ch === quote) quote = null;
      } else if (ch === '"' || ch === "'") {
        quote = ch;
      } else if (ch === '>') {
        break;
      }
      j += 1;
    }

    if (j >= len) break;

    if (isClosing) {
      if (depth > 0) depth -= 1;
    } else {
      if (depth === 0 && tagName === 'title') {
        return true;
      }

      let k = j - 1;
      while (k >= nameEnd && /\s/.test(slotHtml.charAt(k))) k -= 1;
      const selfClosing = slotHtml[k] === '/';
      if (!selfClosing && !HTML_VOID_ELEMENTS.has(tagName)) {
        depth += 1;
      }
    }

    i = j + 1;
  }

  return false;
}
