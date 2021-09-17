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

const createVueComponent = (iconName, iconNode) => (props, context) =>
  h(
    'svg',
    {
      ...defaultAttributes,
      width: props.size || defaultAttributes.width,
      height: props.size || defaultAttributes.height,
      class: ['lucide', `lucide-${toKebabCase(iconName)}`],
      ...context.attrs,
      ...props,
    },
    iconNode.map(child => h(...child)),
  );

export default createVueComponent;
