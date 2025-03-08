import { h, type JSX } from 'preact';
import { mergeClasses, toKebabCase } from '@lucide/shared';
import Icon from './Icon';
import type { IconNode, LucideIcon, LucideProps } from './types';

/**
 * Create a Lucide icon component
 * @param {string} componentName
 * @param {array} iconNode
 * @param {string} iconName
 * @returns {FunctionComponent} LucideIcon
 */
const createLucideIcon = (
  componentName: string,
  iconNode: IconNode,
  iconName: string,
): LucideIcon => {
  const Component = ({ class: classes = '', children, ...props }: LucideProps) =>
    h(
      Icon,
      {
        ...props,
        iconNode,
        class: mergeClasses<string | JSX.SignalLike<string | undefined>>(
          `lucide-${toKebabCase(componentName)}`,
          `lucide-${iconName}`,
          classes,
        ),
      },
      children,
    );

  Component.displayName = `${componentName}`;

  return Component;
};

export default createLucideIcon;
