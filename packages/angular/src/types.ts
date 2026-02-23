import { Signal, Type } from '@angular/core';

type HtmlAttributes = { [key: string]: string | number };
export type LucideIconNode = readonly [string, HtmlAttributes];
export type LucideIcons = { [key: string]: LucideIconData };

/**
 * A Lucide icon object that fully describes an icon to be displayed.
 */
export type LucideIconData = {
  name: string;
  node: LucideIconNode[];
  aliases?: string[];
};

/**
 * Input signal map of Lucide icon components.
 */
interface LucideIconProps {
  title: Signal<Nullable<string>>;
  size: Signal<Nullable<number>>;
  color: Signal<Nullable<string>>;
  strokeWidth: Signal<Nullable<number>>;
  absoluteStrokeWidth: Signal<Nullable<boolean>>;
}

/**
 * Represents a Lucide icon component type that has `iconName` and `iconData` signals inherited from `LucideIconBase` and respective static members accessible without instantiating the component.
 */
export interface LucideIcon extends Type<LucideIconProps> {
  icon: LucideIconData;
}

/**
 * Type guard for {@link LucideIconData}
 */
export function isLucideIconData(icon: unknown): icon is LucideIconData {
  return (
    !!icon &&
    typeof icon === 'object' &&
    'name' in icon &&
    typeof icon.name === 'string' &&
    'node' in icon &&
    Array.isArray(icon.node)
  );
}

/**
 * Type guard for {@link LucideIcon}
 */
export function isLucideIconComponent(icon: unknown): icon is LucideIcon {
  return icon instanceof Type && 'icon' in icon && isLucideIconData(icon.icon);
}

export type LucideIconInput = LucideIcon | LucideIconData | string;

/**
 * @internal
 */
export type Nullable<T> = T | null | undefined;
