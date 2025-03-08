import { createElement, forwardRef } from 'react';
import { mergeClasses, toKebabCase } from '@lucide/shared';
import { IconNode, LucideProps } from './types';
import Icon from './Icon';

/**
 * Create a Lucide icon component
 * @param {string} componentName
 * @param {array} iconNode
 * @param {string} iconName
 * @returns {ForwardRefExoticComponent} LucideIcon
 */
const createLucideIcon = (componentName: string, iconNode: IconNode, iconName: string) => {
  const Component = forwardRef<SVGSVGElement, LucideProps>(({ className, ...props }, ref) =>
    createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(componentName)}`,
        `lucide-${iconName}`,
        className,
      ),
      ...props,
    }),
  );

  Component.displayName = `${componentName}`;

  return Component;
};

export default createLucideIcon;
