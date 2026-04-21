import { toKebabCase, toPascalCase } from '@lucide/shared';
import { Icon } from './Icon';
import type { IconNode } from './types';

/**
 * Create a Lucide icon custom element class and register it as `lucide-${kebabIconName}`.
 */
export default function createLucideIcon(
  iconName: string,
  iconNode: IconNode,
): CustomElementConstructor {
  const kebabName = toKebabCase(toPascalCase(iconName));

  class LucideIcon extends Icon {
    constructor() {
      super();
      this.iconNode = iconNode;
      this.name = kebabName;
    }
  }

  const tag = `lucide-${kebabName}`;

  if (!customElements.get(tag)) {
    customElements.define(tag, LucideIcon);
  }

  Object.defineProperty(LucideIcon, 'name', { value: toPascalCase(iconName) });

  return LucideIcon as CustomElementConstructor;
}
