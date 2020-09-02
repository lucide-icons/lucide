import { camelCase, upperFirst } from 'lodash-es';
import createElement from './createElement';

/**
 * Get the attributes of an HTML element.
 * @param {HTMLElement} element
 * @returns {Object}
 */
function getAttrs(element) {
  return Array.from(element.attributes).reduce((attrs, attr) => {
    attrs[attr.name] = attr.value;
    return attrs;
  }, {});
}

export default (element, { nameAttr, icons, attrs }) => {
  console.log(element);
  const iconName = element.getAttribute(nameAttr);
  const ComponentName = upperFirst(camelCase(iconName));

  const iconNode = icons[ComponentName];

  if (!iconNode) {
    return console.warn(
      `${element.outerHTML} icon name was not found in the provided icons object.`,
    );
  }

  const [, iconAttrs] = iconNode;

  iconNode[1] = {
    ...iconAttrs,
    ...getAttrs(element),
    ...attrs,
  };

  const svgElement = createElement(iconNode);

  return element.parentNode.replaceChild(svgElement, element);
};
