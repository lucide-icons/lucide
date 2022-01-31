import createElement from './createElement';

/**
 * Get the attributes of an HTML element.
 * @param {HTMLElement} element
 * @returns {Object}
 */
export const getAttrs = element =>
  Array.from(element.attributes).reduce((attrs, attr) => {
    attrs[attr.name] = attr.value;
    return attrs;
  }, {});

/**
 * Gets the classNames of an attributes Object.
 * @param {Object} attrs
 * @returns {Array}
 */
export const getClassNames = attrs => {
  if (typeof attrs === 'string') return attrs;
  if (!attrs || !attrs.class) return '';
  if (attrs.class && typeof attrs.class === 'string') {
    return attrs.class.split(' ');
  }
  if (attrs.class && Array.isArray(attrs.class)) {
    return attrs.class;
  }
  return '';
};

/**
 * Combines the classNames of array of classNames to a String
 * @param {array} arrayOfClassnames
 * @returns {string}
 */
export const combineClassNames = arrayOfClassnames => {
  const classNameArray = arrayOfClassnames.flatMap(getClassNames);

  return classNameArray
    .map(classItem => classItem.trim())
    .filter(Boolean)
    .filter((value, index, self) => self.indexOf(value) === index)
    .join(' ');
};

const toPascalCase = string =>
  string.replace(/(\w)(\w*)(_|-|\s*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase());

/**
 * ReplaceElement, replaces the given element with the created icon.
 * @param {HTMLElement} element
 * @param {{ nameAttr: string, icons: object, attrs: object }} options: { nameAttr, icons, attrs }
 * @returns {Function}
 */
export default (element, { nameAttr, icons, attrs }) => {
  const iconName = element.getAttribute(nameAttr);
  const ComponentName = toPascalCase(iconName);

  const iconNode = icons[ComponentName];

  if (!iconNode) {
    return console.warn(
      `${element.outerHTML} icon name was not found in the provided icons object.`,
    );
  }

  const elementAttrs = getAttrs(element);
  const [tag, iconAttributes, children] = iconNode;

  const iconAttrs = {
    ...iconAttributes,
    'icon-name': iconName,
    ...attrs,
    ...elementAttrs,
  };

  const classNames = combineClassNames(['lucide', `lucide-${iconName}`, elementAttrs, attrs]);

  if (classNames) {
    iconAttrs.class = classNames;
  }

  const svgElement = createElement([tag, iconAttrs, children]);

  return element.parentNode.replaceChild(svgElement, element);
};
