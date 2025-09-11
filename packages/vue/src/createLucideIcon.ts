import { h } from 'vue';
import type { FunctionalComponent } from 'vue';
import { IconNode, LucideProps } from './types';
import Icon from './Icon';

// Create interface extending SVGAttributes

/**
 * Create a Lucide icon component
 * @param {string} iconName
 * @param {array} iconNode
 * @returns {FunctionalComponent} LucideIcon
 */
const createLucideIcon =
  (iconName: string, iconNode: IconNode): FunctionalComponent<LucideProps> =>
  (props, { slots, attrs }) =>
    h(
      Icon,
      {
        ...attrs,
        ...props,
        iconNode,
        name: iconName,
      },
      slots,
    );

export default createLucideIcon;
