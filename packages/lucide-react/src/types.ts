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

  /**
   * SVG stroke-linecap attribute.
   * Controls the shape at the end of open subpaths.
   */
  strokeLinecap?: 'butt' | 'round' | 'square';

  /**
   * SVG stroke-linejoin attribute.
   * Controls the shape at corners of strokes.
   */
  strokeLinejoin?: 'bevel' | 'miter' | 'round';

  /**
   * SVG stroke-dasharray attribute.
   * Creates dashed or dotted strokes.
   * @example "5 5" for dashed, "2 2" for dotted
   */
  strokeDasharray?: string | number;

  /**
   * SVG stroke-dashoffset attribute.
   * Offsets the dash pattern start position.
   */
  strokeDashoffset?: string | number;

  /**
   * SVG opacity attribute.
   * Controls overall icon transparency (0-1).
   */
  opacity?: number;

  /**
   * SVG stroke-opacity attribute.
   * Controls stroke transparency only (0-1).
   */
  strokeOpacity?: number;
}

export type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;
