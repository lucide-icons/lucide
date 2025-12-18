import type { SVGProps, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * A reduced version of `SVGElementType` from @types/react. This type was added
 * with the release of React 19, and is included here in order to support usage
 * with older versions.
 */
type SVGElementType =
  | 'circle'
  | 'ellipse'
  | 'g'
  | 'line'
  | 'mask'
  | 'path'
  | 'polygon'
  | 'polyline'
  | 'rect';

export type IconNode = [elementName: SVGElementType, attrs: Record<string, string>, children: IconNode][];

export type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ElementAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;

export interface LucideProps extends ElementAttributes {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;
