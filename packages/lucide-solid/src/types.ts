import { JSX } from 'solid-js/jsx-runtime';
import type {
  LucideIconData as SharedLucideIconData,
  LucideIconNode as SharedLucideIconNode,
} from '@lucide/shared/types';

export type SVGAttributes = Partial<JSX.SvgSVGAttributes<SVGSVGElement>>;

export type LucideIconNode = SharedLucideIconNode<keyof JSX.IntrinsicElements, SVGAttributes>;

export type LucideIconData = SharedLucideIconData<keyof JSX.IntrinsicElements, SVGAttributes>;

/**
 * @deprecated Use LucideIconNode instead.
 */
export type IconNode = LucideIconNode[];

export interface LucideProps extends SVGAttributes {
  key?: string | number;
  class?: string;
  size?: string | number;
  width?: string | number;
  height?: string | number;
  color?: string;
  strokeWidth?: string | number;
  /**
   * @deprecated Use `nonScalingStroke` instead.
   */
  absoluteStrokeWidth?: boolean;
  nonScalingStroke?: boolean;
}

export type LucideIcon = (props: LucideProps) => JSX.Element;
