type HtmlAttributes = { [key: string]: string | number };
export type LucideIconNode = readonly [string, HtmlAttributes, LucideIconData];
export type LucideIconData = readonly LucideIconNode[];
export type LucideIcons = { [key: string]: LucideIconData };

/** @deprecated Use LucideIconData instead. Will be removed in v1.0. */
export type IconData = LucideIconData;

/** @deprecated Use LucideIconNode instead. Will be removed in v1.0. */
export type IconNode = LucideIconNode;

/** @deprecated Use LucideIcons instead. Will be removed in v1.0. */
export type Icons = LucideIcons;
