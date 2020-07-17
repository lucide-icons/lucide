const createElement = (tag, attrs, children = []) => {
  const element = document.createElement(tag);

  Object.keys(attrs).forEach(name => {
    element.setAttribute(name, attrs[name]);
  })

  if (children.length) {
    children = children.forEach(child => {
      const childElement = createElement(child);

      element.appendChild(childElement);
    });
  }
}

export default (iconNode) => createElement(iconNode);
