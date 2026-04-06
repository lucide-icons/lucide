import { type FunctionComponent, type JSX } from 'preact';
import type {
  LucideIconData as SharedLucideIconData,
  LucideIconNode as SharedLucideIconNode,
} from '@lucide/shared';

export type LucideIconNode = SharedLucideIconNode[];

export type LucideIconData = SharedLucideIconData & {
  name: string;
  node: LucideIconNode;
};

/**
 * @deprecated Use LucideIconNode instead.
 */
export type IconNode = LucideIconNode;

export interface LucideProps extends Partial<Omit<JSX.SVGAttributes, 'ref' | 'size'>> {
  color?: string;
  size?: string | number;
  strokeWidth?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type LucideIcon = FunctionComponent<LucideProps>;
