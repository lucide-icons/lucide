import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    Input,
    OnChanges,
    SimpleChange,
} from '@angular/core';
import {LucideIconData} from '../icons/types';
import { createElement } from '../helpers/create-element';
import defaultAttributes from '../icons/constants/default-attributes';
import {LUCIDE_ICONS, LucideIconProviderInterface} from './lucide-icon.provider';

interface TypedChange<T> extends SimpleChange {
    previousValue: T;
    currentValue: T;
}

type LucideAngularComponentChanges = {
    name?: TypedChange<string>;
    img?: TypedChange<LucideIconData>;
    color?: TypedChange<string>;
    size?: TypedChange<number>;
    strokeWidth?: TypedChange<number>;
    scaleStrokeWidth?: TypedChange<boolean>;
};

export function formatFixed(number: number, decimals = 3): string {
    return parseFloat(number.toFixed(decimals)).toString(10);
}

@Component({
    selector: 'lucide-angular, lucide-icon, i-lucide, span-lucide',
    template: '<ng-content></ng-content>',
})
export class LucideAngularComponent implements OnChanges {
    @Input() name?: string;
    @Input() img?: LucideIconData;
    @Input() color: string = defaultAttributes.stroke;
    _size: number = defaultAttributes.height;
    get size(): number | string {
        return this._size;
    }

    @Input() set size(value: string | number) {
        this._size = this.parseNumber(value);
    }

    _strokeWidth: number = defaultAttributes['stroke-width'];
    get strokeWidth(): number | string {
        return this._strokeWidth;
    }

    @Input() set strokeWidth(value: string | number) {
        this._strokeWidth = this.parseNumber(value);
    }

    @Input() scaleStrokeWidth = true;
    defaultSize: number;

    constructor(
        @Inject(ElementRef) private elem: ElementRef,
        @Inject(ChangeDetectorRef) private changeDetector: ChangeDetectorRef,
        @Inject(LUCIDE_ICONS) private iconProviders: LucideIconProviderInterface[]
    ) {
        this.defaultSize = defaultAttributes.height;
    }

    ngOnChanges(changes: LucideAngularComponentChanges): void {
        this.color = this.color ?? defaultAttributes.stroke;
        this.size = this.parseNumber(this.size ?? this.defaultSize);
        this.strokeWidth = this.parseNumber(
            this.strokeWidth ?? defaultAttributes['stroke-width']
        );
        this.scaleStrokeWidth = this.scaleStrokeWidth ?? true;
        if (changes.name) {
            const icoOfName = this.getIcon(this.toPascalCase(changes.name.currentValue));

            if (!icoOfName) {
                console.warn(
                    `Icon not found: ${changes.name.currentValue}\n` +
                        "Please check icon name or 'lucide icon list'"
                );
            } else {
                this.replaceElement(icoOfName);
            }
        } else if (changes.img) {
            this.replaceElement(changes.img.currentValue);
        }

        this.changeDetector.markForCheck();
    }

    replaceElement(img: LucideIconData): void {

        const attributes = {
            ...defaultAttributes,
            ...img[1],
            width:
                typeof this.size === 'number'
                    ? this.size.toString(10)
                    : this.size,
            height:
                typeof this.size === 'number'
                    ? this.size.toString(10)
                    : this.size,
            stroke: this.color,
            'stroke-width': this.scaleStrokeWidth
                ? this.strokeWidth.toString(10)
                : formatFixed(this._strokeWidth / (this._size / this.defaultSize)),
        };
        const icoElement = createElement([img[0], attributes, img[2]]);
        icoElement.classList.add('lucide');
        if (this.name) {
            icoElement.classList.add(`lucide-${this.name.replace('_', '-')}`);
        }
        this.elem.nativeElement.innerHTML = '';
        this.elem.nativeElement.append(icoElement);
    }

    toPascalCase(str: string): string {
        return str.replace(
            /(\w)([a-z0-9]*)(_|-|\s*)/g,
            (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
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

    private getIcon(name: string): LucideIconData|null {
        for (const iconProvider of Array.isArray(this.iconProviders) ? this.iconProviders : [this.iconProviders]) {
            if (iconProvider.hasIcon(name)) {
                return iconProvider.getIcon(name);
            }
        }
        return null;
    }


}
