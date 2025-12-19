import { InjectionToken, Provider } from '@angular/core';
import { LucideIconData, LucideIcons } from './types';
import { isLucideIconComponent, LucideIconComponentType } from './types';
import { toKebabCase } from './utils/to-kebab-case';

export const LUCIDE_ICONS = new InjectionToken<LucideIcons>('Lucide icons', {
  factory: () => ({}),
});

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
