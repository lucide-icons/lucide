import { h } from 'vue';
import defaultAttributes from './defaultAttributes';

/**
 * Converts string to KebabCase
 * Copied from scripts/helper. If anyone knows how to properly import it here
 * then please fix it.
 *
 * @param {string} string
 * @returns {string} A kebabized string
 */
export const toKebabCase = string => string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const createVueComponent = (iconName, iconNode) => (
  { size, color, ...props }, // props
  { attrs, emit, slots } // context
  ) => {
  return h(
    'svg',
    {
      ...defaultAttributes,
      width: size || defaultAttributes.width,
      height: size || defaultAttributes.height,
      stroke: color || defaultAttributes.stroke,
      ...attrs,
      class: ['lucide', `lucide-${toKebabCase(iconName)}`, attrs?.class || ''],
      ...props,
    },
    [
      ...iconNode.map(child => h(...child)),
      ...(slots.default ? [slots.default()] : [])
    ],
  );
};

export default createVueComponent;
