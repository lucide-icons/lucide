import { mergeClasses, toKebabCase } from './utils';
import type { AstroComponentFactory } from 'astro/runtime/server/render/astro/factory.js';
import type { IconNode } from './types';
import { render, renderSlot, createComponent, renderComponent } from 'astro/compiler-runtime';
import Icon from './Icon.astro';

export default (iconName: string, iconNode: IconNode): AstroComponentFactory => {
  const Component = createComponent(
    ($$result, $$props: Record<string, any>, $$slots) => {
      const { class: className, ...restProps } = $$props;
      return render`${renderComponent(
        $$result,
        'Icon',
        Icon,
        {
          class: mergeClasses(
            Boolean(iconName) && `lucide-${toKebabCase(iconName)}`,
            Boolean(className) && className,
          ),
          iconNode,
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
