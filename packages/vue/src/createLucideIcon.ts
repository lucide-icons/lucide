import { h } from 'vue';
import { IconNode, LucideIcon } from './types';
import Icon from './Icon';

/**
 * Create a Lucide icon component
 * @param {string} iconName
 * @param {array} iconNode
 * @returns {FunctionalComponent} LucideIcon
 */
const createLucideIcon =
  (iconName: string, iconNode: IconNode): LucideIcon =>
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
