import { Signal, Type } from '@angular/core';

type HtmlAttributes = { [key: string]: string | number };
export type LucideIconNode = readonly [string, HtmlAttributes];
export type LucideIconData = readonly LucideIconNode[];
export type LucideIcons = { [key: string]: LucideIconData };

/**
 * Represents a Lucide icon component that has `iconName` and `iconData` signals inherited from `LucideIconBase` and respective static members accessible without instantiating the component.
 */
export type LucideIconComponentType = Type<{
  iconName: Signal<Nullable<string>>;
  iconData: Signal<Nullable<LucideIconData>>;
}> & {
  iconName: string;
  iconData: LucideIconData;
};

/**
 * Type guard for {@link LucideIconData}
 */
export function isLucideIconData(icon: unknown): icon is LucideIconData {
  return Array.isArray(icon);
}

/**
 * Type guard for {@link LucideIconComponentType}
 */
export function isLucideIconComponent(icon: unknown): icon is LucideIconComponentType {
  return (
    icon instanceof Type &&
    'iconData' in icon &&
    Array.isArray(icon.iconData) &&
    'iconName' in icon &&
    typeof icon.iconName === 'string'
  );
}

export type LucideIconInput = LucideIconComponentType | LucideIconData | string;

/**
 * @internal
 */
export type Nullable<T> = T | null | undefined;
