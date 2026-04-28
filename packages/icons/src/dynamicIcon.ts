import dynamicIconImports from './dynamicIconImports';

export type LucideIconName = keyof typeof dynamicIconImports;

/**
 * The list of available Lucide icon names.
 */
export const lucideIconNames = Object.keys(dynamicIconImports) as Array<LucideIconName>;
