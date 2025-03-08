import { h, type JSX } from 'preact';
import { mergeClasses, toKebabCase, toPascalCase } from '@lucide/shared';
import Icon from './Icon';
import type { IconNode, LucideIcon, LucideProps } from './types';

/**
 * Create a Lucide icon component
 * @param {string} iconName
 * @param {array} iconNode
 * @returns {FunctionComponent} LucideIcon
 */
const createLucideIcon = (iconName: string, iconNode: IconNode): LucideIcon => {
  const Component = ({ class: classes = '', children, ...props }: LucideProps) =>
    h(
      Icon,
      {
        ...props,
        iconNode,
        class: mergeClasses<string | JSX.SignalLike<string | undefined>>(
          `lucide-${toKebabCase(toPascalCase(iconName))}`,
          `lucide-${toKebabCase(iconName)}`,
          classes,
        ),
      },
      children,
    );

  Component.displayName = toPascalCase(iconName);

  return Component;
};

export default createLucideIcon;
