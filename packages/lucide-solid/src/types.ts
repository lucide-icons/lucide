import type { JSX } from '@solidjs/web';
import type {
  LucideIconData as SharedLucideIconData,
  LucideIconNode as SharedLucideIconNode,
} from '@lucide/shared/types';

export type SVGAttributes = Partial<JSX.SvgSVGAttributes<SVGSVGElement>>;

type IntrinsicElementName = Extract<keyof JSX.IntrinsicElements, string>;

// Icon nodes mix element types (path, circle, line, ...), each with its own
// attribute set, so this intentionally falls back to @lucide/shared's permissive
// default `SVGProps` rather than the root-<svg>-only `SVGAttributes` above.
export type LucideIconNode = SharedLucideIconNode<IntrinsicElementName>;

export type LucideIconData = SharedLucideIconData<IntrinsicElementName>;

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
  children?: JSX.Element;
}

export type LucideIcon = (props: LucideProps) => JSX.Element;
