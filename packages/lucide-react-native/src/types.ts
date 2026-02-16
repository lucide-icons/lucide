import type { ForwardRefExoticComponent } from 'react';
import type { SvgProps } from 'react-native-svg';

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

export interface LucideProps extends SvgProps {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
  className?: string;
  'data-testid'?: string;
}

export type LucideIcon = ForwardRefExoticComponent<LucideProps>;
