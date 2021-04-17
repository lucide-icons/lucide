import { Component, ElementRef, Input, Inject, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Icons } from './icons.provider';
import { IconData } from '../icons/types';
import { createElement } from '../helpers/create-element';

@Component({
  selector: 'lucide-angular, lucide-icon, i-lucide, span-lucide',
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: inline-block;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      width: 24px;
      height: 24px;
    }
  `]
})

export class LucideAngularComponent implements OnChanges {
  @Input() name!: string;
  @Input() img!: IconData;

  constructor(
    @Inject(ElementRef) private elem: ElementRef,
    @Inject(ChangeDetectorRef) private changeDetector: ChangeDetectorRef,
    @Inject(Icons) private icons: Icons
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.name) {
      // icons are provided as an array of objects because of "multi: true"
      const icons = Object.assign({}, ...(this.icons as any as object[]));
      const icoOfName = icons[this.toPascalCase(changes.name.currentValue)] || '';

      if (!icoOfName) {
        console.warn(
          `Icon not found: ${changes.name.currentValue}\n` +
          `Please check icon name or \'lucide icon list\'`
        );
      } else {
        const icoElement = createElement(icoOfName);
        icoElement.setAttribute('stroke-width', 'inherit');
        icoElement.setAttribute('fill', 'inherit');
        icoElement.removeAttribute('width');
        icoElement.removeAttribute('height');

        this.elem.nativeElement.innerHTML = '';
        this.elem.nativeElement.append(icoElement);
      }
    }
    else if (changes.img) {
      const icoElement = createElement(changes.img.currentValue);
      icoElement.setAttribute('stroke-width', 'inherit');
      icoElement.setAttribute('fill', 'inherit');
      icoElement.removeAttribute('width');
      icoElement.removeAttribute('height');

      this.elem.nativeElement.innerHTML = '';
      this.elem.nativeElement.append(icoElement);
    }

    this.changeDetector.markForCheck();
  }

  toPascalCase(str: string): string {
    return str.replace(/(\w)([a-z0-9]*)(_|-|\s*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase());
  }
}
