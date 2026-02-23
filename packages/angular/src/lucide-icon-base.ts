import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
  Signal,
} from '@angular/core';
import { LUCIDE_CONFIG } from './lucide-config';
import { LucideIconData, Nullable } from './types';
import defaultAttributes from './default-attributes';

function transformNumericStringInput(
  value: Nullable<string | number>,
  defaultValue: number,
): number {
  if (typeof value === 'string') {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      return defaultValue;
    }
    return parsedValue;
  }
  return value ?? defaultValue;
}

/**
 * @internal
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg[lucideIcon]',
  templateUrl: './lucide-icon.html',
  host: {
    ...defaultAttributes,
    class: 'lucide',
    '[attr.width]': 'size().toString(10)',
    '[attr.height]': 'size().toString(10)',
    '[attr.stroke]': 'color()',
    '[attr.stroke-width]': 'strokeWidth().toString(10)',
    '[attr.aria-hidden]': '!title()',
  },
})
export abstract class LucideIconBase {
  protected abstract readonly icon: Signal<Nullable<LucideIconData>>;
  protected readonly iconConfig = inject(LUCIDE_CONFIG);
  protected readonly elRef = inject(ElementRef);
  protected readonly renderer = inject(Renderer2);
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
    transform: (value: Nullable<string | number>) =>
      transformNumericStringInput(value, this.iconConfig.size),
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
    transform: (value: Nullable<string | number>) =>
      transformNumericStringInput(value, this.iconConfig.strokeWidth),
  });
  /**
   * If set to true, it adds [`vector-effect="non-scaling-stroke"`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/vector-effect) to child elements.
   */
  readonly absoluteStrokeWidth = input(this.iconConfig.absoluteStrokeWidth, {
    transform: (value: Nullable<boolean>) => value ?? this.iconConfig.absoluteStrokeWidth,
  });

  constructor() {
    effect((onCleanup) => {
      const icon = this.icon();
      if (icon) {
        const absoluteStrokeWidth = this.absoluteStrokeWidth();
        const { name, node, aliases = [] } = icon;
        const classes = [name, ...aliases].map((item) => `lucide-${item}`);
        for (const cssClass of classes) {
          this.renderer.addClass(this.elRef.nativeElement, cssClass);
        }
        const elements = node.map(([name, attrs]) => {
          const element = this.renderer.createElement(name, 'http://www.w3.org/2000/svg');
          if (absoluteStrokeWidth) {
            this.renderer.setAttribute(element, 'vector-effect', 'non-scaling-stroke');
          }
          Object.entries(attrs).forEach(([name, value]) =>
            this.renderer.setAttribute(
              element,
              name,
              typeof value === 'number' ? value.toString(10) : value,
            ),
          );
          this.renderer.appendChild(this.elRef.nativeElement, element);
          return element;
        });
        onCleanup(() => {
          elements.forEach((element) =>
            this.renderer.removeChild(this.elRef.nativeElement, element),
          );
          for (const cssClass of classes) {
            this.renderer.removeClass(this.elRef.nativeElement, cssClass);
          }
        });
      }
    });
  }
}
