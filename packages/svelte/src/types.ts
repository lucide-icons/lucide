import type { SVGAttributes } from 'svelte/elements';
import type { Snippet, Component } from 'svelte';
import type {
  LucideIconData as SharedLucideIconData,
  LucideIconNode as SharedLucideIconNode,
} from '@lucide/shared/types';

export type Attrs = SVGAttributes<SVGSVGElement>;
type IconNodeElements =
  | 'circle'
  | 'ellipse'
  | 'g'
  | 'line'
  | 'path'
  | 'polygon'
  | 'polyline'
  | 'rect';

export type LucideIconNode = SharedLucideIconNode<IconNodeElements, Attrs>;

export type LucideIconData = SharedLucideIconData<IconNodeElements, Attrs>;

/**
 * @deprecated Use LucideIconNode instead.
 */
export type IconNode = LucideIconNode[];

export type LucideProps = Attrs & {
  color?: string;
  size?: number | string;
  strokeWidth?: number | string;
  /**
   * @deprecated Use `nonScalingStroke` instead.
   */
  absoluteStrokeWidth?: boolean;
  nonScalingStroke?: boolean;
  children?: Snippet;
  title?: string;
};

export type IconProps = LucideProps &
  (
    | {
        icon: LucideIconData;
        iconNode?: never;
      }
    | {
        icon?: never;
        iconNode: LucideIconNode[];
      }
  );

export type LucideIcon = Component<LucideProps>;

export type IconEvents = {
  [evt: string]: CustomEvent<any>;
};

export type IconSlots = {
  default: {};
};
