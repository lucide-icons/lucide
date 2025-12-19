import { Signal, Type } from '@angular/core';

type HtmlAttributes = { [key: string]: string | number };
export type LucideIconNode = readonly [string, HtmlAttributes];
export type LucideIconData = readonly LucideIconNode[];
export type LucideIcons = { [key: string]: LucideIconData };

export interface LucideIconComponentInterface {
  iconName: Signal<Nullable<string>>;
  iconData: Signal<Nullable<LucideIconData>>;
}

export type LucideIconComponentType = Type<LucideIconComponentInterface> & {
  iconName: string;
  iconData: LucideIconData;
};

export function isLucideIconData(icon: unknown): icon is LucideIconData {
  return Array.isArray(icon);
}

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

export type Nullable<T> = T | null | undefined;
