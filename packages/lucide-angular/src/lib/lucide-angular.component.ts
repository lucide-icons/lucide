import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChange,
} from '@angular/core';
import { LucideIconData } from '../icons/types';
import defaultAttributes from '../icons/constants/default-attributes';
import { LucideIconConfig } from './lucide-icon.config';

interface TypedChange<T> extends SimpleChange {
  previousValue: T;
  currentValue: T;
}

type SvgAttributes = { [key: string]: string | number };

type LucideAngularComponentChanges = {
  name?: TypedChange<string | LucideIconData>;
  icon?: TypedChange<LucideIconData | undefined>;
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
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg[lucideIcon]',
  template: '<ng-content></ng-content>',
  standalone: true,
})
export class LucideAngularComponent implements OnInit, OnChanges {
  @Input() class?: string;
  @Input() name?: string;
  @Input('lucideIcon') icon?: LucideIconData;
  @Input() color?: string;
  @Input() absoluteStrokeWidth = false;
  defaultSize: number;

  constructor(
    @Inject(ElementRef) protected elem: ElementRef,
    @Inject(Renderer2) protected renderer: Renderer2,
    @Inject(ChangeDetectorRef) protected changeDetector: ChangeDetectorRef,
    @Inject(LucideIconConfig) protected iconConfig: LucideIconConfig
  ) {
    this.defaultSize = defaultAttributes.height;
    console.log(this.name, this.icon);
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

  ngOnInit() {
    this.buildIcon();
  }

  ngOnChanges(changes: LucideAngularComponentChanges): void {
    if (
      changes.name ||
      changes.icon ||
      changes.color ||
      changes.size ||
      changes.absoluteStrokeWidth ||
      changes.strokeWidth ||
      changes.class
    ) {
      this.buildIcon();
    }

    this.changeDetector.markForCheck();
  }

  buildIcon(): void {
    this.color = this.color ?? this.iconConfig.color;
    this.size = this.parseNumber(this.size ?? this.iconConfig.size);
    this.strokeWidth = this.parseNumber(this.strokeWidth ?? this.iconConfig.strokeWidth);
    this.absoluteStrokeWidth = this.absoluteStrokeWidth ?? this.iconConfig.absoluteStrokeWidth;
    console.log('Hello, my name is ', this.name, ' my icon is ', this.icon);
    if (this.icon) {
      this.replaceElement(this.icon);
    }
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
    const icoElement = this.elem.nativeElement;
    for (const [name, value] of Object.entries(attributes)) {
      icoElement.setAttribute(name, value);
    }
    icoElement.classList.add('lucide');
    if (typeof this.name === 'string') {
      icoElement.classList.add(`lucide-${this.name.replace('_', '-')}`);
    }
    if (this.class) {
      icoElement.classList.add(
        ...this.class
          .split(/ /)
          .map((a) => a.trim())
          .filter((a) => a.length > 0)
      );
    }
    for (const child of icoElement.children) {
      this.renderer.removeChild(this.elem.nativeElement, child);
    }
    for (const node of img) {
      const childElement = this.createElement(node);
      this.renderer.appendChild(icoElement, childElement);
    }
  }

  protected parseNumber(value: string | number): number {
    if (typeof value === 'string') {
      const parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) {
        throw new Error(`${value} is not numeric.`);
      }
      return parsedValue;
    }
    return value;
  }

  protected createElement([tag, attrs, children = []]: readonly [
    string,
    SvgAttributes,
    LucideIconData?
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
