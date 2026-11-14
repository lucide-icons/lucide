import type { FunctionalComponent, SVGAttributes } from 'vue';
import type {
  LucideIconData as SharedLucideIconData,
  LucideIconNode as SharedLucideIconNode,
} from '@lucide/shared/types';

export interface LucideProps extends Partial<SVGAttributes> {
  size?: 24 | number;
  strokeWidth?: number | string;
  nonScalingStroke?: boolean;
  'non-scaling-stroke'?: boolean;
}

export type LucideIconNode = SharedLucideIconNode;

export type LucideIconData = SharedLucideIconData;

/**
 * @deprecated Use LucideIconNode instead.
 */
export type IconNode = LucideIconNode[];

export type LucideIcon = FunctionalComponent<LucideProps>;
