import { h } from 'vue';
import type { FunctionalComponent } from 'vue';
import { IconNode, LucideProps, LucideIcon } from './types';
import Icon from './Icon';

/**
 * Create a Lucide icon component
 * @param {string} iconName
 * @param {array} iconNode
 * @returns {FunctionalComponent} LucideIcon
 */
const createLucideIcon =
  (iconName: string, iconNode: IconNode): LucideIcon =>
  (props, { slots }) =>
    h(
      Icon,
      {
        ...props,
        iconNode,
        name: iconName,
      },
      slots,
    );

export default createLucideIcon;
