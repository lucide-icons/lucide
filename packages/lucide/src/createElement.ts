import { buildLucideIconElement } from '@lucide/shared';
import { IconNode, SVGProps } from './types';

/**
 * Creates a new HTMLElement from icon node
 * @param {array} iconNode - Icon node to be converted to an element
 * @param {object} customAttrs - Custom attributes to be added to the element
 * @returns {HTMLElement}
 */
const createElement = (iconNode: IconNode, customAttrs: SVGProps = {}) => {
  return buildLucideIconElement(
    document,
    {
      size: 24,
      node: iconNode,
    },
    {
      includeDefaultClasses: false,
      attributes: customAttrs,
    },
  ) as SVGElement;
};

export default createElement;
