export type SVGProps = Record<string, any>;

/**
 * A Lucide icon node (an svgson-like internal format)
 */
export type LucideIconNode =
  | [attrName: string, attributes: SVGProps]
  | [attrName: string, attributes: SVGProps, children: LucideIconNode[]];

/**
 * A Lucide icon object that fully describes an icon to be displayed.
 */
export type LucideIconData = {
  name?: string;
  node: LucideIconNode[];
  aliases?: string[];
} & ({ size?: number } | { width?: number; height?: number });

/**
 * Build parameters for creating a Lucide icon instance for display.
 */
export type LucideBuildParams = {
  /**
   * The color of the icon.
   */
  color?: string;
  /**
   * The stroke width.
   */
  strokeWidth?: string | number;
  /**
   * Adds [`vector-effect="non-scaling-stroke"`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/vector-effect) to child elements.
   */
  absoluteStrokeWidth?: boolean;
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
  attributes?: SVGProps;
} & ({ size?: string | number } | { width?: string | number; height?: string | number });
