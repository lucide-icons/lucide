import { mergeClasses, toKebabCase } from "@lucide/shared"
import type { AstroComponentFactory } from "astro/runtime/server/render/astro/factory.js"
import type { IconNode } from './types';
import {
  render,
  renderSlot,
  createAstro,
  createComponent,
  renderComponent,
} from "astro/compiler-runtime"
import Icon from './Icon.astro';

export default (iconName: string, iconNode: IconNode): AstroComponentFactory => {
  const Compoment = createComponent(($$result, $$props, $$slots) => {
    const $$Astro = createAstro(undefined);
    const Astro = $$result.createAstro($$Astro, $$props, $$slots);
    const { class: className, ...restProps } = Astro.props;
    return render`${renderComponent($$result, 'Icon', Icon, {
      class: mergeClasses(
        Boolean(iconName) && `lucide-${toKebabCase(iconName)}`,
        Boolean(className) && className
      ),
      iconNode,
      ...restProps,
    }, { "default": () => render`${renderSlot($$result, $$slots["default"])}`, })}`;
  }, undefined, "none");
  return Compoment;
}
