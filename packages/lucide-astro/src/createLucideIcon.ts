import {
  render,
  createAstro,
  createComponent,
  renderComponent,
} from "astro/dist/runtime/compiler"

// @ts-expect-error typescript doesn't handle .astro files
// but the consumer will be an Astro file anyway
import Icon from './Icon.astro';
import type { IconNode } from './types';

export default (iconName: string, iconNode: IconNode) => {
  const $$Astro = createAstro(undefined);
  const Compoment = createComponent(($$result, $$props, $$slots) => {
    const Astro = $$result.createAstro($$Astro, $$props, $$slots);
    return render`${renderComponent($$result, 'Icon', Icon, { ...Astro.props, "name": iconName, "iconNode": iconNode })}`;
  }, undefined, undefined);
  return Compoment;
}
