import type { SVGProps, ForwardRefExoticComponent, RefAttributes } from 'react';
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

export type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type ElementAttributes = RefAttributes<SVGSVGElement> & SVGAttributes;

export interface LucideProps extends ElementAttributes {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
}

export type LucideIcon = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;
