import { LucideIcon, LucideIconData } from './types';
import { LucideIconBase } from './lucide-icon-base';
import { signal } from '@angular/core';

/**
 * Creates a Lucide icon component class from an icon data object.
 *
 * You still have to provide the appropriate @Component decorator yourself.
 * Make sure to use an `svg` element selector, e.g. `svg[lucideIconName]`.
 *
 * @usage
 * ```ts
 * import { Component } from '@angular/core';
 * import { createLucideIcon, lucideIconTemplate } from '@lucide/angular';
 * import { MyCustomIconData } from './icons/my-custom-icon';
 *
 * @Component({
 *   selector: 'svg[myCustomIcon]',
 *   template: lucideIconTemplate,
 *   standalone: true,
 * })
 * export class MyCustomIcon extends createLucideIcon(MyCustomIconData) {
 * }
 * ```
 */
export function createLucideIcon(iconData: LucideIconData): LucideIcon {
  class IconComponent extends LucideIconBase {
    static readonly icon: LucideIconData = iconData;
    protected override readonly icon = signal(iconData);
  }
  return IconComponent;
}
