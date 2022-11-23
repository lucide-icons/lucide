import { IconData } from '../icons/types'

/**
 * Creates a new SVGElement from icon node
 * @param {string} tag
 * @param {object} attrs
 * @param {array} children
 * @returns {SVGElement}
 */
export const createElement = (document: Document, [tag, attrs, children = []]: IconData): SVGElement => {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);

  Object.keys(attrs).forEach(name => {
    element.setAttribute(name, attrs[name]);
  });

  if (children.length) {
    children.forEach((child: IconData) => {
      const childElement = createElement(document, child);

      element.appendChild(childElement);
    });
  }

  return element;
};
