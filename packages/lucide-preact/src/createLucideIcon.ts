import { h, type JSX } from 'preact';
import { mergeClasses, toLucideIconData, toPascalCase } from '@lucide/shared';
import Icon from './Icon';
import type { LucideIcon, LucideIconData, LucideIconNode, LucideProps } from './types';

/**
 * Creates a Lucide icon component from icon data.
 *
 * @param iconData Icon data object.
 * @returns Lucide icon component.
 */
function createLucideIcon(iconData: LucideIconData): LucideIcon;

/**
 * Creates a Lucide icon component from the legacy icon arguments.
 *
 * @param iconName Icon name.
 * @param iconNode Icon node.
 * @param aliases Optional icon aliases.
 * @returns Lucide icon component.
 */
function createLucideIcon(
  iconName: string,
  iconNode: LucideIconNode,
  aliases?: string[],
): LucideIcon;

function createLucideIcon(
  iconDataOrName: LucideIconData | string,
  iconNode?: LucideIconNode,
  aliases: string[] = [],
): LucideIcon {
  const iconData =
    typeof iconDataOrName === 'string'
      ? toLucideIconData(iconDataOrName, iconNode as LucideIconNode, aliases)
      : iconDataOrName;

  const Component = ({ class: classes = '', className = '', children, ...props }: LucideProps) =>
    h(
      Icon,
      {
        ...props,
        name: iconData.name,
        aliases: iconData.aliases,
        iconNode: iconData.node,
        class: mergeClasses<string | JSX.SignalLike<string | undefined>>(classes, className),
      },
      children,
    );

  Component.displayName = toPascalCase(iconData.name);

  return Component;
}

export default createLucideIcon;
