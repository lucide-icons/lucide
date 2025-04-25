import defaultAttributes from './defaultAttributes';
import { IconNode, SVGProps } from './types';

type CreateSVGElementParams = [tag: string, attrs: SVGProps, children?: IconNode];

/**
 * Creates a new SVGElement
 * @param {string} tag - Tag name of the element
 * @param {object} attrs - Attributes of the element
 * @param {array} children - Children of the element
 * @returns {SVGElement}
 */
const createSVGElement = ([tag, attrs, children]: CreateSVGElementParams) => {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);

  Object.keys(attrs).forEach((name) => {
    element.setAttribute(name, String(attrs[name]));
  });

  if (children?.length) {
    children.forEach((child) => {
      const childElement = createSVGElement(child);

      element.appendChild(childElement);
    });
  }

  return element;
};

/**
 * Creates a new HTMLElement from icon node
 * @param {array} iconNode - Icon node to be converted to an element
 * @param {object} customAttrs - Custom attributes to be added to the element
 * @returns {HTMLElement}
 */
const createElement = (iconNode: IconNode, customAttrs: SVGProps = {}) => {
  const tag = 'svg';
  const attrs = {
    ...defaultAttributes,
    ...customAttrs,
  };

  return createSVGElement([tag, attrs, iconNode]);
};

export default createElement;
