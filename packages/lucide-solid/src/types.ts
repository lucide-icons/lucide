import { JSX } from 'solid-js/jsx-runtime';

export type IconNode = [elementName: keyof JSX.IntrinsicElements, attrs: Record<string, string>][];
export interface LucideIconData {
  name: string;
  node: IconNode;
  aliases?: string[];
}
export type SVGAttributes = Partial<JSX.SvgSVGAttributes<SVGSVGElement>>;

export interface LucideProps extends SVGAttributes {
  key?: string | number;
  class?: string;
  size?: string | number;
  color?: string;
  strokeWidth?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type LucideIcon = (props: LucideProps) => JSX.Element;
