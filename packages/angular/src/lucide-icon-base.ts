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
import { formatFixed } from './utils/format-fixed';
import { toKebabCase } from './utils/to-kebab-case';

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
    '[attr.stroke-width]': 'computedStrokeWidth()',
    '[attr.aria-hidden]': 'ariaHidden()',
  },
})
export abstract class LucideIconBase {
  abstract iconName: Signal<Nullable<string>>;
  abstract iconData: Signal<Nullable<LucideIconData>>;
  protected readonly iconConfig = inject(LUCIDE_CONFIG);
  protected readonly elRef = inject(ElementRef);
  protected readonly renderer = inject(Renderer2);
  readonly title = input<Nullable<string>>();
  readonly ariaHidden = computed(() => {
    return !this.title();
  });
  readonly size = input(this.iconConfig.size, {
    transform: (value: Nullable<string | number>) =>
      transformNumericStringInput(value, this.iconConfig.size),
  });
  readonly color = input(this.iconConfig.color, {
    transform: (value: Nullable<string>) => value ?? this.iconConfig.color,
  });
  readonly strokeWidth = input(this.iconConfig.strokeWidth, {
    transform: (value: Nullable<string | number>) =>
      transformNumericStringInput(value, this.iconConfig.strokeWidth),
  });
  readonly absoluteStrokeWidth = input(this.iconConfig.absoluteStrokeWidth, {
    transform: (value: Nullable<boolean>) => value ?? this.iconConfig.absoluteStrokeWidth,
  });
  protected readonly computedStrokeWidth = computed(() => {
    const strokeWidth = this.strokeWidth();
    const size = this.size();
    return this.absoluteStrokeWidth()
      ? formatFixed(strokeWidth / (size / 24))
      : strokeWidth.toString(10);
  });

  constructor() {
    effect((onCleanup) => {
      const icon = this.iconData();
      if (icon) {
        const elements = icon.map(([name, attrs]) => {
          const element = this.renderer.createElement(name, 'http://www.w3.org/2000/svg');
          for (const [name, value] of Object.entries(attrs)) {
            this.renderer.setAttribute(
              element,
              name,
              typeof value === 'number' ? value.toString(10) : value,
            );
          }
          this.renderer.appendChild(this.elRef.nativeElement, element);
          return element;
        });
        onCleanup(() => {
          for (const element of elements) {
            this.renderer.removeChild(this.elRef.nativeElement, element);
          }
        });
      }
    });
    effect((onCleanup) => {
      const name = this.iconName();
      if (name) {
        const cssClass = `lucide-${toKebabCase(name)}`;
        this.renderer.addClass(this.elRef.nativeElement, cssClass);
        onCleanup(() => {
          this.renderer.removeClass(this.elRef.nativeElement, cssClass);
        });
      }
    });
  }
}
