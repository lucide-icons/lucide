import type { SvelteComponent } from 'svelte';
import type { SVGAttributes, SvelteHTMLElements } from 'svelte/elements';

export type Attrs = SVGAttributes<SVGSVGElement>;

export type IconNode = [elementName: keyof SvelteHTMLElements, attrs: Attrs][];

export interface IconProps extends Attrs {
  color?: string;
  size?: number | string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
  class?: string;
}

type IconEvents = {
  [evt: string]: CustomEvent<any>;
};

type IconSlots = {
  default: {};
};

export type Icon = SvelteComponent<IconProps, IconEvents, IconSlots>;
