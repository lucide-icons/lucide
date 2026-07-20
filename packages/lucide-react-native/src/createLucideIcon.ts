import { forwardRef, createElement } from 'react';
import { IconNode, LucideProps } from './types';
import { toPascalCase } from '@lucide/shared';
import Icon from './Icon';

/**
 * Create a Lucide icon component
 * @param {string} iconName
 * @param {array} iconNode
 * @returns {ForwardRefExoticComponent} LucideIcon
 */
const createLucideIcon = (iconName: string, iconNode: IconNode) => {
  const Component = forwardRef<SVGSVGElement, LucideProps>((props, ref) =>
    createElement(Icon, {
      ref,
      iconNode,
      ...props,
    }),
  );

  Component.displayName = toPascalCase(iconName);

  return Component;
};

export default createLucideIcon;
