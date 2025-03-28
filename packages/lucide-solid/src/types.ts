import { JSX } from 'solid-js/jsx-runtime';

export type IconNode = [elementName: keyof JSX.IntrinsicElements, attrs: Record<string, string>, children: IconNode][];
export type SVGAttributes = Partial<JSX.SvgSVGAttributes<SVGSVGElement>>;

export interface LucideProps extends SVGAttributes {
  key?: string | number;
  color?: string;
  size?: string | number;
  strokeWidth?: string | number;
  class?: string;
  absoluteStrokeWidth?: boolean;
}

export type LucideIcon = (props: LucideProps) => JSX.Element;
