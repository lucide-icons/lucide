import { InjectionToken, Provider } from '@angular/core';
import { isLucideIconComponent, LucideIcon, LucideIconData, LucideIcons } from './types';

/**
 * Injection token for providing Lucide icons by name.
 *
 * @internal Use {@link provideLucideIcons}
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
 * import { MyCustomIcon } from './custom-icons/my-custom-icon';
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
export function provideLucideIcons(...icons: Array<LucideIcon | LucideIconData>): Provider {
  return {
    provide: LUCIDE_ICONS,
    useValue: icons.reduce((acc, icon) => {
      const iconData = isLucideIconComponent(icon) ? icon.icon : icon;
      acc[iconData.name] = iconData;
      for (const alias of iconData.aliases ?? []) {
        acc[alias] = iconData;
      }
      return acc;
    }, {} as LucideIcons),
  };
}

/**
 * Converts a legacy icon node to the new format, for custom icon (e.g. `@lucide/lab`) support.
 *
 * @usage
 * ```ts
 * import { provideLucideIcons, lucideLegacyIcon } from '@lucide/angular';
 * import { UserRoundX } from 'lucide-angular';
 * import { burger } from '@lucide/lab';
 *
 * provideLucideIcons(
 *   lucideLegacyIcon('user-round-x', UserRoundX, ['user-circle-x']),
 *   lucideLegacyIcon('burger', burger, ['hamburger']),
 * ),
 * ```
 */
export function lucideLegacyIcon(
  name: string,
  node: LucideIconData['node'],
  aliases: string[] = [],
): LucideIconData {
  return {
    name,
    node,
    aliases,
  };
}

/**
 * Converts a map of legacy icon nodes to a list of icon data objects.
 *
 * @usage
 * ```ts
 * import { provideLucideIcons, lucideLegacyIconMap, LucideCircle } from '@lucide/angular';
 * import { UserRoundX } from 'lucide-angular';
 * import { burger } from '@lucide/lab';
 *
 * provideLucideIcons(
 *   LucideCircle,
 *   ...lucideLegacyIconMap({ UserRoundX, burger }),
 * ),
 * ```
 */
export function lucideLegacyIconMap(
  icons: Record<string, LucideIconData['node']>,
): LucideIconData[] {
  return Object.entries(icons).map(([pascalName, node]) => {
    const name: string = pascalName.replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    return {
      name,
      node,
      aliases: [pascalName],
    };
  });
}
