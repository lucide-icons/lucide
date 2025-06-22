import createElement from './createElement';
import defaultAttributes from './defaultAttributes';
import { Icons } from './types';

export type CustomAttrs = { [attr: string]: any };

/**
 * Get the attributes of an HTML element.
 * @param {HTMLElement} element
 * @returns {Object}
 */
export const getAttrs = (element: Element): Record<string, string> =>
  Array.from(element.attributes).reduce<Record<string, string>>((attrs, attr) => {
    attrs[attr.name] = attr.value;
    return attrs;
  }, {});

/**
 * Gets the classNames of an attributes Object.
 * @param {Object} attrs
 * @returns {Array}
 */
export const getClassNames = (
  attrs: Record<string, string | string[]> | string,
): string | string[] => {
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
export const combineClassNames = (
  arrayOfClassnames: (string | Record<string, string | string[]>)[],
) => {
  const classNameArray = arrayOfClassnames.flatMap(getClassNames);

  return classNameArray
    .map((classItem) => classItem.trim())
    .filter(Boolean)
    .filter((value, index, self) => self.indexOf(value) === index)
    .join(' ');
};

const toPascalCase = (string: string): string =>
  string.replace(/(\w)(\w*)(_|-|\s*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase());

interface ReplaceElementOptions {
  nameAttr: string;
  icons: Icons;
  attrs: Record<string, string>;
}

/**
 * ReplaceElement, replaces the given element with the created icon.
 * @param {HTMLElement} element
 * @param {{ nameAttr: string, icons: object, attrs: object }} options: { nameAttr, icons, attrs }
 * @returns {Function}
 */
const replaceElement = (element: Element, { nameAttr, icons, attrs }: ReplaceElementOptions) => {
  const iconName = element.getAttribute(nameAttr);

  if (iconName == null) return;

  const ComponentName = toPascalCase(iconName);

  const iconNode = icons[ComponentName];

  if (!iconNode) {
    return console.warn(
      `${element.outerHTML} icon name was not found in the provided icons object.`,
    );
  }

  const elementAttrs = getAttrs(element);

  const iconAttrs = {
    ...defaultAttributes,
    'data-lucide': iconName,
    ...attrs,
    ...elementAttrs,
  };

  const classNames = combineClassNames(['lucide', `lucide-${iconName}`, elementAttrs, attrs]);

  if (classNames) {
    Object.assign(iconAttrs, {
      class: classNames,
    });
  }

  const svgElement = createElement(iconNode, iconAttrs);

  return element.parentNode?.replaceChild(svgElement, element);
};

export default replaceElement;
