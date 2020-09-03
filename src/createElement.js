const createElement = (tag, attrs, children = []) => {
  const element = document.createElementNS(tag);

  Object.keys(attrs).forEach(name => {
    element.setAttributeNS(name, attrs[name]);
  });

  if (children.length) {
    children = children.forEach(child => {
      const childElement = createElement(...child);

      element.appendChild(childElement);
    });
  }

  return element;
};

export default ([tag, attrs, children]) => createElement(tag, attrs, children);
