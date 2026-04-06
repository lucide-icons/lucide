import { h } from 'vue';
import { LucideIcon, LucideIconData } from './types';
import Icon from './Icon';

/**
 * Create a Lucide icon component
 * @param {object} iconData
 * @returns {FunctionalComponent} LucideIcon
 */
const createLucideIcon =
  (iconData: LucideIconData): LucideIcon =>
  (props, { slots, attrs }) =>
    h(
      Icon,
      {
        ...attrs,
        ...props,
        iconNode: iconData.node,
        name: iconData.name,
        aliases: iconData.aliases,
      },
      slots,
    );

export default createLucideIcon;
