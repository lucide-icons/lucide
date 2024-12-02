export * from './icons/index';
export * as icons from './icons/index';
export * from './aliases';
export * from './types';
export { default as defaultAttributes } from './defaultAttributes';

// @ts-expect-error typescript doesn't handle .astro files
// but the consumer will be an Astro file anyway
export { default as Icon } from './Icon.astro';
