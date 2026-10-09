import { h } from 'vue';
import { LucideIcon, LucideIconData, LucideIconNode } from './types';
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
 * @returns Lucide icon component.
 */
function createLucideIcon(iconName: string, iconNode: LucideIconNode[]): LucideIcon;

function createLucideIcon(
  iconDataOrName: LucideIconData | string,
  iconNode: LucideIconNode[] = [],
): LucideIcon {
  const icon: LucideIconData =
    typeof iconDataOrName === 'string'
      ? {
          name: iconDataOrName,
          node: iconNode,
        }
      : iconDataOrName;
  return (props, { slots }) =>
    h(
      Icon,
      {
        ...props,
        icon,
      },
      slots.default ? { default: slots.default } : undefined,
    );
}

export default createLucideIcon;
