import type { ForwardRefExoticComponent } from 'react';
import type { SvgProps } from 'react-native-svg';
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

export interface LucideProps extends SvgProps {
  size?: string | number;
  absoluteStrokeWidth?: boolean;
  'data-testid'?: string;
}

export type LucideIcon = ForwardRefExoticComponent<LucideProps>;
