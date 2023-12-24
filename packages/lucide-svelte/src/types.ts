import type { SVGAttributes, SvelteHTMLElements } from 'svelte/elements';

type SVGAttrs = SVGAttributes<SVGSVGElement>;

export type IconNode = [elementName: keyof SvelteHTMLElements, attrs: SVGAttrs][];

export interface IconProps extends SVGAttrs {
  color?: string;
  size?: number | string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
  class?: string;
}
