import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  Renderer2,
  Signal,
  viewChild,
} from '@angular/core';
import { LUCIDE_CONFIG } from './lucide-config';
import { LucideIconData, LucideIconNode, Nullable } from './types';
import defaultAttributes from './default-attributes';
import { lucideIconTemplate } from './lucide-icon-template';
import buildLucideIconNode from './utils/buildLucideIconNode';

/**
 * @internal
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg[lucideIcon]',
  template: lucideIconTemplate,
  host: {
    ...defaultAttributes,
    '[attr.class]': 'computedClass()',
    '[attr.width]': 'computedWidth()',
    '[attr.height]': 'computedHeight()',
    '[attr.viewBox]': 'computedViewbox()',
    '[attr.stroke]': 'computedStroke()',
    '[attr.stroke-width]': 'computedStrokeWidth()',
    '[attr.aria-hidden]': 'computedAriaHidden()',
  },
})
export abstract class LucideIconBase {
  protected abstract readonly icon: Signal<Nullable<LucideIconData>>;
  protected readonly iconConfig = inject(LUCIDE_CONFIG);
  protected readonly elRef = inject(ElementRef);
  protected readonly renderer = inject(Renderer2);
  protected readonly contentRef = viewChild.required<ElementRef>('contentRef');
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
   * Icon width.
   * @default 24
   */
  readonly width = input(null);
  /**
   * Icon height.
   * @default 24
   */
  readonly height = input(null);
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
   * Whether to use absolute stroke width.
   */
  readonly absoluteStrokeWidth = input(this.iconConfig.absoluteStrokeWidth, {
    transform: (value: Nullable<boolean>) => value ?? this.iconConfig.absoluteStrokeWidth,
  });
  /**
   * If set to true, it adds [`vector-effect="non-scaling-stroke"`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/vector-effect) to child elements.
   */
  readonly nonScalingStroke = input(this.iconConfig.nonScalingStroke, {
    transform: (value: Nullable<boolean>) => value ?? this.iconConfig.nonScalingStroke,
  });

  /**
   * @internal
   */
  protected readonly computedIcon = computed(() => {
    const icon = this.icon();
    return icon
      ? buildLucideIconNode(icon, {
          width: this.width() ?? this.size(),
          height: this.height() ?? this.size(),
          color: this.color(),
          strokeWidth: this.strokeWidth(),
          absoluteStrokeWidth: this.absoluteStrokeWidth(),
          nonScalingStroke: this.nonScalingStroke(),
          hasA11yProp: this.title() != null,
        })
      : null;
  });

  /**
   * @internal
   */
  protected readonly computedAttributes = computed<LucideIconNode[1] | undefined>(
    () => this.computedIcon()?.[1],
  );

  /**
   * @internal
   */
  protected readonly computedIconNode = computed(() => this.computedIcon()?.[2]);

  /**
   * @internal
   */
  protected readonly computedWidth = computed(
    () => this.computedAttributes()?.['width'] ?? this.iconConfig.size,
  );

  /**
   * @internal
   */
  protected readonly computedHeight = computed(
    () => this.computedAttributes()?.['height'] ?? this.iconConfig.size,
  );

  /**
   * @internal
   */
  protected readonly computedStroke = computed(
    () => this.computedAttributes()?.['stroke'] ?? this.iconConfig.color,
  );

  /**
   * @internal
   */
  protected readonly computedStrokeWidth = computed(
    () => this.computedAttributes()?.['stroke-width'] ?? this.iconConfig.strokeWidth,
  );

  /**
   * @internal
   */
  protected readonly computedAriaHidden = computed(
    () => this.computedAttributes()?.['aria-hidden'] === 'true',
  );

  /**
   * @internal
   */
  protected readonly computedViewbox = computed(
    () => this.computedAttributes()?.['viewBox'] ?? '0 0 24 24',
  );

  /**
   * @internal
   */
  protected readonly computedClass = computed(
    () => this.computedAttributes()?.['class'] ?? 'lucide',
  );

  constructor() {
    effect((onCleanup) => {
      const iconNode = this.computedIconNode();
      const iconAttributes = this.computedIconNode();
      if (iconNode && iconAttributes) {
        const contentRef = this.contentRef();
        const refChild = contentRef.nativeElement;
        const elements = iconNode.map(([name, attrs]) => {
          const element = this.renderer.createElement(name, 'http://www.w3.org/2000/svg');

          Object.entries(attrs).forEach(([name, value]) =>
            this.renderer.setAttribute(
              element,
              name,
              typeof value === 'number' ? value.toString(10) : value,
            ),
          );
          this.renderer.insertBefore(this.elRef.nativeElement, element, refChild);
          return element;
        });
        onCleanup(() => {
          elements.forEach((element) =>
            this.renderer.removeChild(this.elRef.nativeElement, element),
          );
        });
      }
    });
  }
}
