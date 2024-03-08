import {
  ReactSVG,
  SVGProps,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

export type IconNode = [elementName: keyof ReactSVG, attrs: Record<string, string>][];

export type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ComponentAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;

export interface LucideProps extends ComponentAttributes {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type LucideIcon = ForwardRefExoticComponent<LucideProps>;
