import type { ForwardRefExoticComponent, SVGElementType } from 'react';
import type { SvgProps } from 'react-native-svg';

export type IconNode = [elementName: SVGElementType, attrs: Record<string, string>][];

export interface LucideProps extends SvgProps {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
  'data-testid'?: string;
}

export type LucideIcon = ForwardRefExoticComponent<LucideProps>;
