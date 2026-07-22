import htmlPlugin from 'prettier/plugins/html';

const GEOMETRY_ELEMENTS = new Set([
  'path',
  'circle',
  'ellipse',
  'line',
  'polyline',
  'polygon',
  'rect',
]);

const isWhitespaceTextNode = (node) =>
  node.type === 'text' && (node.value ?? node.chars ?? '').trim() === '';

const getChildren = (node) => (node.children ?? []).filter((child) => !isWhitespaceTextNode(child));

const printAttribute = (attribute) => {
  if (attribute.value === null || attribute.value === undefined) {
    return attribute.name;
  }

  return `${attribute.name}="${attribute.value}"`;
};

const printInlineOpeningTag = (node) => {
  const attributes = node.attrs?.map(printAttribute) ?? [];
  return attributes.length > 0 ? `<${node.name} ${attributes.join(' ')}` : `<${node.name}`;
};

const printGeometryElement = (node) => `${printInlineOpeningTag(node)} />`;

const indent = (content) =>
  content
    ?.split('\n')
    .map((line) => `  ${line}`)
    .join('\n');

const printElement = (node) => {
  const children = getChildren(node);

  if (GEOMETRY_ELEMENTS.has(node.name) && children.length === 0) {
    return printGeometryElement(node);
  }

  if (children.length === 0) {
    return `${printInlineOpeningTag(node)}></${node.name}>`;
  }

  return [
    `${printInlineOpeningTag(node)}>`,
    ...children.map((child) => indent(printNode(child))),
    `</${node.name}>`,
  ].join('\n');
};

const printSvgElement = (node) => {
  const attributes = node.attrs ?? [];
  const children = getChildren(node);

  return [
    '<svg',
    ...attributes.map((attribute) => `  ${printAttribute(attribute)}`),
    '>',
    ...children.map((child) => indent(printNode(child))).filter(Boolean),
    '</svg>',
  ].join('\n');
};

const printNode = (node) => {
  if (node.type === 'root') {
    return `${getChildren(node).map(printNode).join('\n')}\n`;
  }

  if (node.type === 'element' && node.name === 'svg') {
    return printSvgElement(node);
  }

  if (node.type === 'element') {
    return printElement(node);
  }

  if (node.type === 'text') {
    return null;
  }

  return null;
};

const plugin = {
  languages: [
    {
      name: 'Lucide SVG',
      parsers: ['lucide-svg'],
      extensions: ['.svg'],
      vscodeLanguageIds: ['svg'],
    },
  ],
  parsers: {
    'lucide-svg': {
      ...htmlPlugin.parsers.html,
      astFormat: 'lucide-svg',
      parse: htmlPlugin.parsers.html.parse,
      locStart: htmlPlugin.parsers.html.locStart,
      locEnd: htmlPlugin.parsers.html.locEnd,
    },
  },
  printers: {
    'lucide-svg': {
      print(path) {
        return printNode(path.node);
      },
    },
  },
};

export default plugin;
