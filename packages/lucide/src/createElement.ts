import { IconNode, IconNodeChild, SVGProps } from "./types";


/**
 * Creates a new HTMLElement from icon node
 * @param {string} tag
 * @param {object} attrs
 * @param {array} children
 * @returns {HTMLElement}
 */
const createElement = (tag: string, attrs: SVGProps, children: IconNodeChild[] = []) => {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);

  Object.keys(attrs).forEach((name) => {
    element.setAttribute(name, String(attrs[name]));
  });

  if (children.length) {
    children.forEach(child => {
      const childElement = createElement(...child);

      element.appendChild(childElement);
    });
  }

  return element;
};

/**
 * Creates a new HTMLElement from icon node
 * @param {[tag: string, attrs: object, children: array]} iconNode
 * @returns {HTMLElement}
 */
export default ([tag, attrs, children]: IconNode) => createElement(tag, attrs, children);
