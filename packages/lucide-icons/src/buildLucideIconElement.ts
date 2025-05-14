import { LucideBuildParams, LucideIcon, LucideIconNode } from './types';
import buildLucideIconNode from './buildLucideIconNode';

const buildDomElement = (
  document: Document,
  [tagName, attributes, children = []]: LucideIconNode,
): Element => {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tagName);
  for (const [attrName, value] of Object.entries(attributes)) {
    element.setAttribute(attrName, value);
  }
  for (const node of children) {
    const childNode = buildDomElement(document, node);
    element.appendChild(childNode);
  }
  return element;
};

function buildLucideIconElement(
  document: Document,
  icon: LucideIcon,
  params: LucideBuildParams = {},
) {
  return buildDomElement(document, buildLucideIconNode(icon, params));
}

export default buildLucideIconElement;
