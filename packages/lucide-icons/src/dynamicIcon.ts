import dynamicIconImports from './dynamicIconImports';

export type LucideIconName = keyof typeof dynamicIconImports;

export const lucideIconNames = Object.keys(dynamicIconImports) as Array<LucideIconName>;
