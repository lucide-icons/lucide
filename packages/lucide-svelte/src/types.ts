import type { SVGAttributes, SvelteHTMLElements } from 'svelte/elements';

export type IconNode = [
  elementName: keyof SvelteHTMLElements,
  attrs: SVGAttributes<SVGSVGElement>
][];

export interface IconProps {
  color?: string;
  size?: number | string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
  class?: string;
}
