import type { HTMLTag, HTMLAttributes } from 'astro/types';

// Type that the Astro language server needs to infer component props in Astro files
export type AstroComponent = (_props: IconProps) => any;

export type SvgAttributes = HTMLAttributes<"svg">;

export type IconNode = IconNodeChild[];

export interface IconProps extends SvgAttributes {
  name?: string;
  color?: string;
  size?: number | string;
  strokeWidth?: number | string;
  absoluteStrokeWidth?: boolean;
  class?: string;
  iconNode?: IconNode;
}

export type IconEvents = {
  [evt: string]: CustomEvent<any>;
};

export type IconSlots = {
  default: {};
};

// TODO: Could be a more specific union type
type SVGElements = HTMLTag;

type IconNodeChild = [elementName: SVGElements, attrs: SvgAttributes];
