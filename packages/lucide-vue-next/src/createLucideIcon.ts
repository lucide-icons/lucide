import { h } from 'vue';
import type { FunctionalComponent } from 'vue';
import { IconNode, LucideProps } from './types';
import Icon from './Icon';

// Create interface extending SVGAttributes

/**
 * Create a Lucide icon component
 * @param {string} componentName
 * @param {array} iconNode
 * @param {string} iconName
 * @returns {FunctionalComponent} LucideIcon
 */
const createLucideIcon =
  (componentName: string, iconNode: IconNode, iconName: string): FunctionalComponent<LucideProps> =>
  (props, { slots }) =>
    h(
      Icon,
      {
        ...props,
        iconNode,
        componentName,
        iconName,
      },
      slots,
    );

export default createLucideIcon;
