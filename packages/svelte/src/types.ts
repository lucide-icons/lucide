import type { SVGAttributes, SvelteHTMLElements } from 'svelte/elements';
import type { Snippet } from 'svelte';

export type Attrs = SVGAttributes<SVGSVGElement>;

export type IconNode = [elementName: keyof SvelteHTMLElements, attrs: Attrs, children: IconNode][];

export interface IconProps extends Attrs {
  name?: string;
  color?: string;
  size?: number | string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
  iconNode?: IconNode;
  children?: Snippet;
}

export type IconEvents = {
  [evt: string]: CustomEvent<any>;
};

export type IconSlots = {
  default: {};
};
