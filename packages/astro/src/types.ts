import type { HTMLAttributes } from 'astro/types';
import type {
  LucideIconData as SharedLucideIconData,
  LucideIconNode as SharedLucideIconNode,
} from './utils/types';

// Type that the Astro language server needs to infer component props in Astro files
export type AstroComponent = (_props: LucideProps) => any;

export type LucideProps = SVGAttributes & {
  color?: string;
  size?: number | string;
  'stroke-width'?: number | string;
  /**
   * @deprecated Use `nonScalingStroke` instead.
   */
  absoluteStrokeWidth?: boolean;
  nonScalingStroke?: boolean;
  class?: string;
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
        iconNode: LucideIconNode;
      }
  );

export type SVGAttributes = HTMLAttributes<'svg'>;

export type LucideIconNode = SharedLucideIconNode<SVGElements, SVGAttributes>;

export type LucideIconData = SharedLucideIconData<SVGElements, SVGAttributes>;

/**
 * @deprecated Use LucideIconNode instead.
 */
export type IconNode = LucideIconNode[];

// All possible svg elements according to the Astro definitions
type SVGElements =
  | 'svg'
  | 'animate'
  | 'circle'
  | 'clipPath'
  | 'defs'
  | 'desc'
  | 'ellipse'
  | 'feBlend'
  | 'feColorMatrix'
  | 'feComponentTransfer'
  | 'feComposite'
  | 'feConvolveMatrix'
  | 'feDiffuseLighting'
  | 'feDisplacementMap'
  | 'feDistantLight'
  | 'feFlood'
  | 'feFuncA'
  | 'feFuncB'
  | 'feFuncG'
  | 'feFuncR'
  | 'feGaussianBlur'
  | 'feImage'
  | 'feMerge'
  | 'feMergeNode'
  | 'feMorphology'
  | 'feOffset'
  | 'fePointLight'
  | 'feSpecularLighting'
  | 'feSpotLight'
  | 'feTile'
  | 'feTurbulence'
  | 'filter'
  | 'foreignObject'
  | 'g'
  | 'image'
  | 'line'
  | 'linearGradient'
  | 'marker'
  | 'mask'
  | 'metadata'
  | 'path'
  | 'pattern'
  | 'polygon'
  | 'polyline'
  | 'radialGradient'
  | 'rect'
  | 'stop'
  | 'switch'
  | 'symbol'
  | 'text'
  | 'textPath'
  | 'tspan'
  | 'use'
  | 'view';
