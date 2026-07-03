import { Component, computed, inject, input, Signal } from '@angular/core';
import { LUCIDE_CONFIG } from './lucide-config';
import { LucideIconData, Nullable } from './types';
import defaultAttributes from './default-attributes';
import { lucideIconTemplate } from './lucide-icon-template';

/**
 * @internal
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg[lucideIcon]',
  template: lucideIconTemplate,
  host: {
    ...defaultAttributes,
    class: 'lucide',
    '[class]': 'iconClasses()',
    '[attr.width]': 'size()',
    '[attr.height]': 'size()',
    '[attr.stroke]': 'color()',
    '[attr.stroke-width]': 'strokeWidth()',
    '[attr.aria-hidden]': '!title()',
  },
})
export abstract class LucideIconBase {
  protected abstract readonly icon: Signal<Nullable<LucideIconData>>;
  protected readonly iconNodes = computed<LucideIconData['node']>(() => {
    const node = this.icon()?.node ?? [];
    if (!this.absoluteStrokeWidth()) {
      return node;
    }
    return node.map<LucideIconData['node'][number]>(([name, attrs]) => [
      name,
      {
        'vector-effect': 'non-scaling-stroke',
        ...attrs,
      },
    ]);
  });
  protected readonly iconClasses = computed(() => {
    const icon = this.icon();
    if (!icon) {
      return '';
    }
    const { name, aliases = [] } = icon;
    return [name, ...aliases].map((item) => `lucide-${item}`).join(' ');
  });
  protected readonly iconConfig = inject(LUCIDE_CONFIG);
  /**
   * An optional accessible label for the icon.
   * - If provided, it will add the title as an [`<svg:title>` element](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title).
   * - If not provided, the component will add an `aria-hidden="true"` attribute automatically.
   *
   * @remarks
   * Please refer to our [Accessibility guide](https://lucide.dev/guide/advanced/accessibility) regarding this matter.
   * Adding accessible labels to icons is normally not necessary:
   * - If your icon is decorative (as most icons are) just leave it as hidden from screen readers.
   * - If your icon is interactive, it should be contained within an interactive element (e.g. button), and you should probably set your accessible label on that element.
   * - If your icon is functional (e.g. used in place of a label), feel free to use this property.
   */
  readonly title = input<Nullable<string>>();
  /**
   * Width and height.
   * @default 24
   */
  readonly size = input(this.iconConfig.size, {
    transform: (value: Nullable<string | number>) => value ?? this.iconConfig.size,
  });
  /**
   * Stroke color.
   * @default currentColor
   */
  readonly color = input(this.iconConfig.color, {
    transform: (value: Nullable<string>) => value ?? this.iconConfig.color,
  });
  /**
   * Stroke width
   * @default 2
   */
  readonly strokeWidth = input(this.iconConfig.strokeWidth, {
    transform: (value: Nullable<string | number>) => value ?? this.iconConfig.strokeWidth,
  });
  /**
   * If set to true, it adds [`vector-effect="non-scaling-stroke"`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/vector-effect) to child elements.
   */
  readonly absoluteStrokeWidth = input(this.iconConfig.absoluteStrokeWidth, {
    transform: (value: Nullable<boolean>) => value ?? this.iconConfig.absoluteStrokeWidth,
  });
}
