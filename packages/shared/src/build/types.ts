export type SVGProps = Record<string, unknown>;

/**
 * A Lucide icon node (an svgson-like internal format)
 */
export type LucideIconNode<
  TName extends string = string,
  TProps extends Record<string, unknown> = SVGProps,
> =
  | [name: TName, attributes: TProps]
  | [name: TName, attributes: TProps, children: LucideIconNode<TName, TProps>[]];

/**
 * A Lucide icon object that fully describes an icon to be displayed.
 */
export type LucideIconData<
  TName extends string = string,
  TProps extends Record<string, unknown> = SVGProps,
> = {
  name?: string;
  node: LucideIconNode<TName, TProps>[];
  aliases?: string[];
} & (
  | { size?: number; width?: never; height?: never }
  | { size?: never; width?: number; height?: number }
);

/**
 * Build parameters for creating a Lucide icon instance for display.
 */
export type LucideBuildParams<TProps extends Record<string, unknown> = SVGProps> = {
  /**
   * The color of the icon.
   */
  color?: string;
  /**
   * The stroke width.
   */
  strokeWidth?: string | number;
  /**
   * Whether to use absolute stroke width.
   * @deprecated Use `nonScalingStroke` instead.
   */
  absoluteStrokeWidth?: boolean;
  /**
   * Adds [`vector-effect="non-scaling-stroke"`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/vector-effect) to child elements.
   */
  nonScalingStroke?: boolean;
  /**
   * Extra CSS class names to pass to the SVG element.
   */
  className?: string;
  /**
   * Include default Lucide classes on the SVG element.
   *
   * @default true
   */
  includeDefaultClasses?: boolean;
  /**
   * Whether the rendered icon already has accessibility props.
   * If false, `aria-hidden="true"` is added automatically.
   */
  hasA11yProp?: boolean;
  /**
   * Any extra attributes to pass to the SVG element.
   */
  attributes?: TProps;
  /**
   * The attribute names to use for various HTML attributes.
   */
  attributeNames?: Record<string, string>;
} & (
  | { size?: string | number; width?: never; height?: never }
  | { size?: never; width?: string | number; height?: string | number }
);
