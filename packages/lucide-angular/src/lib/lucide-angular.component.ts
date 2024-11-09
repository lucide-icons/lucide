import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  Renderer2,
  SimpleChange,
} from '@angular/core';
import { LucideIconData } from '../icons/types';
import defaultAttributes from '../icons/constants/default-attributes';
import { LUCIDE_ICONS, LucideIconProviderInterface } from './lucide-icon.provider';
import { LucideIconConfig } from './lucide-icon.config';

interface TypedChange<T> extends SimpleChange {
  previousValue: T;
  currentValue: T;
}

type SvgAttributes = { [key: string]: string | number };

type LucideAngularComponentChanges = {
  name?: TypedChange<string | LucideIconData>;
  img?: TypedChange<LucideIconData | undefined>;
  color?: TypedChange<string>;
  size?: TypedChange<number>;
  strokeWidth?: TypedChange<number>;
  absoluteStrokeWidth?: TypedChange<boolean>;
  class: TypedChange<string>;
};

export function formatFixed(number: number, decimals = 3): string {
  return parseFloat(number.toFixed(decimals)).toString(10);
}

@Component({
  selector: 'lucide-angular, lucide-icon, i-lucide, span-lucide',
  template: '<ng-content></ng-content>',
})
export class LucideAngularComponent implements OnChanges {
  @Input() class?: string;
  @Input() name?: string | LucideIconData;
  @Input() img?: LucideIconData;
  @Input() color?: string;
  @Input() absoluteStrokeWidth = false;
  defaultSize: number;

  constructor(
    @Inject(ElementRef) private elem: ElementRef,
    @Inject(Renderer2) private renderer: Renderer2,
    @Inject(ChangeDetectorRef) private changeDetector: ChangeDetectorRef,
    @Inject(LUCIDE_ICONS) private iconProviders: LucideIconProviderInterface[],
    @Inject(LucideIconConfig) private iconConfig: LucideIconConfig,
  ) {
    this.defaultSize = defaultAttributes.height;
  }

  _size?: number;

  get size(): number {
    return this._size ?? this.iconConfig.size;
  }

  @Input() set size(value: string | number | undefined) {
    if (value) {
      this._size = this.parseNumber(value);
    } else {
      delete this._size;
    }
  }

  _strokeWidth?: number;

  get strokeWidth(): number {
    return this._strokeWidth ?? this.iconConfig.strokeWidth;
  }

  @Input() set strokeWidth(value: string | number | undefined) {
    if (value) {
      this._strokeWidth = this.parseNumber(value);
    } else {
      delete this._strokeWidth;
    }
  }

  ngOnChanges(changes: LucideAngularComponentChanges): void {
    if (
      changes.name ||
      changes.img ||
      changes.color ||
      changes.size ||
      changes.absoluteStrokeWidth ||
      changes.strokeWidth ||
      changes.class
    ) {
      this.color = this.color ?? this.iconConfig.color;
      this.size = this.parseNumber(this.size ?? this.iconConfig.size);
      this.strokeWidth = this.parseNumber(this.strokeWidth ?? this.iconConfig.strokeWidth);
      this.absoluteStrokeWidth = this.absoluteStrokeWidth ?? this.iconConfig.absoluteStrokeWidth;
      const nameOrIcon = this.img ?? this.name;
      if (typeof nameOrIcon === 'string') {
        const icoOfName = this.getIcon(this.toPascalCase(nameOrIcon));
        if (icoOfName) {
          this.replaceElement(icoOfName);
        } else {
          throw new Error(
            `The "${nameOrIcon}" icon has not been provided by any available icon providers.`,
          );
        }
      } else if (Array.isArray(nameOrIcon)) {
        this.replaceElement(nameOrIcon);
      } else {
        throw new Error(`No icon name or image has been provided.`);
      }
    }

    this.changeDetector.markForCheck();
  }

  replaceElement(img: LucideIconData): void {
    const attributes = {
      ...defaultAttributes,
      width: this.size,
      height: this.size,
      stroke: this.color ?? this.iconConfig.color,
      'stroke-width': this.absoluteStrokeWidth
        ? formatFixed(this.strokeWidth / (this.size / this.defaultSize))
        : this.strokeWidth.toString(10),
    };
    const icoElement = this.createElement(['svg', attributes, img]);
    icoElement.classList.add('lucide');
    if (typeof this.name === 'string') {
      icoElement.classList.add(`lucide-${this.name.replace('_', '-')}`);
    }
    if (this.class) {
      icoElement.classList.add(
        ...this.class
          .split(/ /)
          .map((a) => a.trim())
          .filter((a) => a.length > 0),
      );
    }
    const childElements = this.elem.nativeElement.childNodes;
    for (const child of childElements) {
      this.renderer.removeChild(this.elem.nativeElement, child);
    }
    this.renderer.appendChild(this.elem.nativeElement, icoElement);
  }

  toPascalCase(str: string): string {
    return str.replace(
      /(\w)([a-z0-9]*)(_|-|\s*)/g,
      (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase(),
    );
  }

  private parseNumber(value: string | number): number {
    if (typeof value === 'string') {
      const parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) {
        throw new Error(`${value} is not numeric.`);
      }
      return parsedValue;
    }
    return value;
  }

  private getIcon(name: string): LucideIconData | null {
    for (const iconProvider of Array.isArray(this.iconProviders)
      ? this.iconProviders
      : [this.iconProviders]) {
      if (iconProvider.hasIcon(name)) {
        return iconProvider.getIcon(name);
      }
    }
    return null;
  }

  private createElement([tag, attrs, children = []]: readonly [
    string,
    SvgAttributes,
    LucideIconData?,
  ]) {
    const element = this.renderer.createElement(tag, 'http://www.w3.org/2000/svg');

    Object.keys(attrs).forEach((name) => {
      const attrValue: string =
        typeof attrs[name] === 'string' ? (attrs[name] as string) : attrs[name].toString(10);
      this.renderer.setAttribute(element, name, attrValue);
    });

    if (children.length) {
      children.forEach((child) => {
        const childElement = this.createElement(child);
        this.renderer.appendChild(element, childElement);
      });
    }

    return element;
  }
}
