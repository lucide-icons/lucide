import h from 'solid-js/h';
import { mergeProps } from 'solid-js';
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

export default (iconName, iconNode) => {
  const Component = ({
    color = 'currentColor',
    size = 24,
    strokeWidth = 2,
    children = [],
    ...rest
  }) =>
    h(
      'svg',
      mergeProps(
        defaultAttributes,
        {
          width: size,
          height: size,
          stroke: color,
          'stroke-width': strokeWidth,
          classList: {
            lucide: true,
            [`lucide-${toKebabCase(iconName)}`]: true,
          },
        },
        rest,
      ),
      [...iconNode.map(([tag, attrs]) => h(tag, attrs)), children],
    );

  Component.displayName = `${iconName}`;

  return Component;
};
