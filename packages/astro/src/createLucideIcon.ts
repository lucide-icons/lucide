import type { AstroComponentFactory } from 'astro/runtime/server/render/astro/factory.js';
import type { LucideIconData } from './types';
import { render, renderSlot, createComponent, renderComponent } from 'astro/compiler-runtime';
import Icon from './Icon.astro';

export default (iconData: LucideIconData): AstroComponentFactory => {
  const Component = createComponent(
    ($$result, $$props: Record<string, any>, $$slots) => {
      const { class: className, ...restProps } = $$props;
      return render`${renderComponent(
        $$result,
        'Icon',
        Icon,
        {
          class: className,
          name: iconData.name,
          aliases: iconData.aliases,
          iconNode: iconData.node,
          ...restProps,
        },
        { default: () => render`${renderSlot($$result, $$slots['default'])}` },
      )}`;
    },
    undefined,
    'none',
  );
  return Component;
};
