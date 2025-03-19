import { h, type JSX } from 'preact';
import { mergeClasses, createLucideClassNames } from '@lucide/shared';
import Icon from './Icon';
import type { IconNode, LucideIcon, LucideProps } from './types';

/**
 * Create a Lucide icon component
 * @param {string} iconName
 * @param {array} iconNode
 * @returns {FunctionComponent} LucideIcon
 */
const createLucideIcon = (iconName: string, iconNode: IconNode, aliasNames: string[] = []): LucideIcon => {
  const lucideClassNames = createLucideClassNames([
    iconName,
    ...aliasNames,
  ]);

  const Component = ({ class: classes = '', children, ...props }: LucideProps) =>
    h(
      Icon,
      {
        ...props,
        iconNode,
        class: mergeClasses<string | JSX.SignalLike<string | undefined>>(
          lucideClassNames,
          classes,
        ),
      },
      children,
    );

  Component.displayName = `${iconName}`;

  return Component;
};

export default createLucideIcon;
