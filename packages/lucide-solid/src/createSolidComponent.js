import h from 'solid-js/h';
import { splitProps } from 'solid-js';
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
  const Component = props => {
    const [localProps, rest] = splitProps(props, [
      'color',
      'size',
      'strokeWidth',
      'children',
      'class',
    ]);

    const svgProps = {
      ...defaultAttributes,
      width: () => (localProps.size != null ? localProps.size : defaultAttributes.width),
      height: () => (localProps.size != null ? localProps.size : defaultAttributes.height),
      stroke: () => (localProps.color != null ? localProps.color : defaultAttributes.stroke),
      'stroke-width': () =>
        localProps.strokeWidth != null ? localProps.strokeWidth : defaultAttributes['stroke-width'],
      class: () =>
        `lucide lucide-${toKebabCase(iconName)} ${
          localProps.class != null ? localProps.class : ''
        }`,
    };

    return h(
      'svg',
      [svgProps, rest],
      [...iconNode.map(([tag, attrs]) => h(tag, attrs)), localProps.children],
    );
  };

  Component.displayName = `${iconName}`;
  return Component;
};
