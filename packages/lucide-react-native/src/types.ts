import type { ForwardRefExoticComponent } from 'react';
import type { SvgProps } from 'react-native-svg';
import type {
  LucideIconData as SharedLucideIconData,
  LucideIconNode as SharedLucideIconNode,
} from '@lucide/shared/types';

export type LucideIconNode = SharedLucideIconNode;

export type LucideIconData = SharedLucideIconData;

/**
 * @deprecated Use LucideIconNode instead.
 */
export type IconNode = LucideIconNode[];

export interface LucideProps extends SvgProps {
  size?: string | number;
  width?: string | number;
  height?: string | number;
  /**
   * @deprecated Use `nonScalingStroke` instead.
   */
  absoluteStrokeWidth?: boolean;
  nonScalingStroke?: boolean;
  'data-testid'?: string;
}

export type LucideIcon = ForwardRefExoticComponent<LucideProps>;
