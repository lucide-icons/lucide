import { camelCase, upperFirst } from 'lodash-es';
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
 * @param {Array} arrayOfClassnames
 * @returns {String}
 */
export const combineClassNames = arrayOfClassnames => {
  const classNameArray = arrayOfClassnames.flatMap(getClassNames);

  return classNameArray.map(classItem => classItem.trim()).join(' ');
};

export default (element, { nameAttr, icons, attrs }) => {
  const iconName = element.getAttribute(nameAttr);
  const ComponentName = upperFirst(camelCase(iconName));

  const iconNode = icons[ComponentName];

  if (!iconNode) {
    return console.warn(
      `${element.outerHTML} icon name was not found in the provided icons object.`,
    );
  }

  const elementAttrs = getAttrs(element);

  const [, iconAttrs] = iconNode;

  const allAttrs = {
    ...iconAttrs,
    ...attrs,
  };

  iconNode[1] = {
    ...allAttrs,
    class: combineClassNames([iconAttrs, elementAttrs, attrs]),
  };

  const svgElement = createElement(iconNode);

  return element.parentNode.replaceChild(svgElement, element);
};
