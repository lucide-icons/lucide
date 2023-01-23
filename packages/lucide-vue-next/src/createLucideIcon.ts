import { h } from 'vue';
import type { SVGAttributes, FunctionalComponent } from 'vue';
import defaultAttributes from './defaultAttributes';

// Create interface extending SVGAttributes
export interface SVGProps extends Partial<SVGAttributes> {
  size?: 24 | number
}


type IconNode = [elementName: string, attrs: Record<string, string>][]

/**
 * Converts string to KebabCase
 * Copied from scripts/helper. If anyone knows how to properly import it here
 * then please fix it.
 *
 * @param {string} string
 * @returns {string} A kebabized string
 */
export const toKebabCase = (string: string) => string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const createLucideIcon = (iconName: string, iconNode: IconNode): FunctionalComponent<SVGProps> => (
  { size, color, ...props }, // props
  { attrs, slots } // context
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

export default createLucideIcon;
