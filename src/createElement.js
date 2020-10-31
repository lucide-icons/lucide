/**
 * Creates a new HTMLElement from icon node
 * @param {string} tag
 * @param {object} attrs
 * @param {array} children
 * @returns {HTMLElement}
 */
const createElement = (tag, attrs, children = []) => {
  const element = document.createElementNS('http://www.w3.org/2000/svg', tag);

  Object.keys(attrs).forEach(name => {
    element.setAttribute(name, attrs[name]);
  });

  if (children.length) {
    children = children.forEach(child => {
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
export default ([tag, attrs, children]) => createElement(tag, attrs, children);
