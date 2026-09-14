import { type FunctionComponent, type JSX } from 'preact';
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

export interface LucideProps extends Partial<Omit<JSX.SVGAttributes, 'ref' | 'size'>> {
  color?: string;
  size?: string | number;
  width?: string | number;
  height?: string | number;
  strokeWidth?: string | number;
  /**
   * @deprecated Use `nonScalingStroke` instead.
   */
  absoluteStrokeWidth?: boolean;
  nonScalingStroke?: boolean;
}

export type LucideIcon = FunctionComponent<LucideProps>;
