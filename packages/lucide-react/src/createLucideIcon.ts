import { createElement, forwardRef } from 'react';
import { toLucideIconData, toPascalCase } from '@lucide/shared';
import { LucideIcon, LucideIconData, LucideIconNode, LucideProps } from './types';
import Icon from './Icon';

/**
 * Creates a Lucide icon component from icon data.
 *
 * @param icon Icon data object.
 * @returns Lucide icon component.
 */
function createLucideIcon(icon: LucideIconData): LucideIcon;

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
  iconNode: LucideIconNode[],
  aliases?: string[],
): LucideIcon;

function createLucideIcon(
  iconDataOrName: LucideIconData | string,
  iconNode: LucideIconNode[] = [],
  aliases: string[] = [],
): LucideIcon {
  const iconData =
    typeof iconDataOrName === 'string'
      ? toLucideIconData(iconDataOrName, iconNode, aliases)
      : iconDataOrName;

  const Component = forwardRef<SVGSVGElement, LucideProps>(({ className, ...props }, ref) =>
    createElement(Icon, {
      ref,
      icon: iconData,
      className,
      ...props,
    }),
  );

  if (iconData.name) {
    Component.displayName = toPascalCase(iconData.name);
  }

  return Component;
}

export default createLucideIcon;
