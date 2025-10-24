import type { SVGAttributes } from 'svelte/elements';
import type { Snippet, Component } from 'svelte';

export type Attrs = SVGAttributes<SVGSVGElement>;
type IconNodeElements = 'circle'
  | 'ellipse'
  | 'g'
  | 'line'
  | 'path'
  | 'polygon'
  | 'polyline'
  | 'rect';

export type IconNode = [elementName: IconNodeElements, attrs: Attrs][];

export interface LucideProps extends Attrs {
  name?: string;
  color?: string;
  size?: number | string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
  iconNode?: IconNode;
  children?: Snippet;
}

export type IconProps = LucideProps;

export type LucideIcon = Component<LucideProps>

export type IconEvents = {
  [evt: string]: CustomEvent<any>;
};

export type IconSlots = {
  default: {};
};
