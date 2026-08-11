import type { AstroComponentFactory } from 'astro/runtime/server/render/astro/factory.js';
import type { LucideIconData, LucideIconNode } from './types';
import { render, renderSlot, createComponent, renderComponent } from 'astro/compiler-runtime';
import Icon from './Icon.astro';

/**
 * Creates a Lucide icon component from icon data.
 *
 * @param icon Icon data object.
 * @returns Lucide icon component.
 */
function createLucideIcon(icon: LucideIconData): AstroComponentFactory;

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
): AstroComponentFactory;

function createLucideIcon(
  iconOrIconName: string | LucideIconData,
  iconNode: LucideIconNode[] = [],
  aliases: string[] = [],
): AstroComponentFactory {
  const icon =
    typeof iconOrIconName === 'string'
      ? {
          name: iconOrIconName,
          node: iconNode,
          aliases,
        }
      : iconOrIconName;
  const Component = createComponent(
    ($$result, $$props: Record<string, any>, $$slots) => {
      const { class: className, ...restProps } = $$props;
      return render`${renderComponent(
        $$result,
        'Icon',
        Icon,
        {
          class: className,
          icon,
          ...restProps,
        },
        { default: () => render`${renderSlot($$result, $$slots['default'])}` },
      )}`;
    },
    undefined,
    'none',
  );
  return Component;
}

export default createLucideIcon;
