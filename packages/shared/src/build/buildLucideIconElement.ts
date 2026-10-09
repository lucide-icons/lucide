import buildLucideIconNode from './buildLucideIconNode';
import type { LucideBuildParams, LucideIconData, LucideIconNode } from './types';

const buildDomElement = (
  document: Document,
  [tagName, attributes, children = []]: LucideIconNode,
): Element => {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tagName);
  for (const [attrName, value] of Object.entries(attributes)) {
    if (value !== undefined && value !== null) {
      element.setAttribute(attrName, String(value));
    }
  }
  for (const node of children) {
    const childNode = buildDomElement(document, node);
    element.appendChild(childNode);
  }
  return element;
};

/**
 * Creates an SvgElement from a Lucide icon object.
 *
 * @param document The document to create the Element in.
 * @param icon The icon to build.
 * @param params Additional build parameters.
 */
function buildLucideIconElement(
  document: Document,
  icon: LucideIconData,
  params: LucideBuildParams = {},
) {
  return buildDomElement(document, buildLucideIconNode(icon, params));
}

export default buildLucideIconElement;
