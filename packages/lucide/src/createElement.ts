import { IconNode, SVGProps } from './types';

type CreateElementParams = [tag: string, attrs: SVGProps, children?: IconNode];

/**
 * Creates a new HTMLElement from icon node
 * @param {string} tag
 * @param {object} attrs
 * @param {array} children
 * @returns {HTMLElement}
 */
const createElement = ([tag, attrs, children]: CreateElementParams) => {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);

  Object.keys(attrs).forEach((name) => {
    element.setAttribute(name, String(attrs[name]));
  });

  if (children?.length) {
    children.forEach((child) => {
      const childElement = createElement(child);

      element.appendChild(childElement);
    });
  }

  return element;
};

export default createElement;
