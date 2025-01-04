import type { SVGProps, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Taken from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/776263e47903cf03cf64cfcc692defefcc5513ab/types/react/index.d.ts#L3873
 * This type was added in @types/react 19, and is duplicated here in order to
 * support usage with older versions.
 */
type SVGElementType =
  | 'circle'
  | 'ellipse'
  | 'g'
  | 'line'
  | 'path'
  | 'polygon'
  | 'polyline'
  | 'rect';

export type IconNode = [elementName: SVGElementType, attrs: Record<string, string>][];

export type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ElementAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;

export interface LucideProps extends ElementAttributes {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;
