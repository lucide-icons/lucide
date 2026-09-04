import type { SVGProps, ForwardRefExoticComponent, RefAttributes } from 'react';
import type {
  LucideIconData as SharedLucideIconData,
  LucideIconNode as SharedLucideIconNode,
} from '@lucide/shared/types';

export type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;

export type LucideIconNode = SharedLucideIconNode<string, SVGAttributes>;

export type LucideIconData = SharedLucideIconData<string, SVGAttributes>;

/**
 * @deprecated Use LucideIconNode instead.
 */
export type IconNode = LucideIconNode[];

type ElementAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;

export interface LucideProps extends ElementAttributes {
  size?: string | number;
  /**
   * @deprecated Use `nonScalingStroke` instead.
   */
  absoluteStrokeWidth?: boolean;
  nonScalingStroke?: boolean;
}

export type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;
