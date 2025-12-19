import { InjectionToken, Provider } from '@angular/core';
import { LucideIconData, LucideIcons } from './types';
import { isLucideIconComponent, LucideIconComponentType } from './types';
import { toKebabCase } from './utils/to-kebab-case';

/**
 * Injection token for providing Lucide icons by name.
 *
 * @internal Use {@link provideLucideConfig}
 */
export const LUCIDE_ICONS = new InjectionToken<LucideIcons>('Lucide icons', {
  factory: () => ({}),
});

/**
 * Provide Lucide icons by name.
 *
 * @remarks
 * Warning! This provider will convert dictionary keys to lower-kebab-case.
 *
 * @param icons Either a dictionary of icons or a list of Angular icon components.
 *
 * @usage
 * ```ts
 * import { provideLucideIcons, SquareCheck } from '@lucide/angular';
 * import { MyCustomIcon } from './custom-icons/circle-check';
 *
 * providers: [
 *   provideLucideIcons({
 *     SquareCheck,
 *     MyCustomIcon, // LucideIconData
 *   }),
 * ]
 * ```
 *
 * ```html
 * <svg lucideIcon="my-custom-icon" />
 * ```
 */
export function provideLucideIcons(
  icons: Record<string, LucideIconData | LucideIconComponentType> | Array<LucideIconComponentType>,
): Provider {
  if (Array.isArray(icons)) {
    return {
      provide: LUCIDE_ICONS,
      useValue: icons.reduce((acc, icon) => {
        acc[toKebabCase(icon.iconName)] = icon.iconData;
        return acc;
      }, {} as LucideIcons),
    };
  } else {
    return {
      provide: LUCIDE_ICONS,
      useValue: Object.entries(icons).reduce((acc, [name, icon]) => {
        if (isLucideIconComponent(icon)) {
          acc[icon.iconName] = icon.iconData;
        } else {
          acc[toKebabCase(name)] = icon;
        }
        return acc;
      }, {} as LucideIcons),
    };
  }
}
