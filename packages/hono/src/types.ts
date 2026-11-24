import type { DOMAttributes, FC, PropsWithChildren } from 'hono/jsx';
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

export interface LucideProps extends PropsWithChildren<Partial<Omit<DOMAttributes, 'size'>>> {
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
  class?: string | Promise<string>;
  className?: string | Promise<string>;
}

export type LucideIcon = FC<LucideProps>;
