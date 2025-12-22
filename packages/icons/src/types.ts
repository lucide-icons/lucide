export type SVGProps = Record<string, string>;

/**
 * A Lucide icon node (an svgson-like internal format)
 */
export type LucideIconNode =
  | [attrName: string, attributes: SVGProps]
  | [attrName: string, attributes: SVGProps, children: LucideIconNode[]];

/**
 * A Lucide icon object that fully describes an icon to be displayed.
 */
export type LucideIcon = {
  name: string;
  node: LucideIconNode[];
} & ({ size: number } | { width: number; height: number });

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
  strokeWidth?: number;
  /**
   * @deprecated Use vector-effect: non-scaling-stroke instead.
   */
  absoluteStrokeWidth?: boolean;
  /**
   * Extra CSS class names to pass to the SVG element.
   */
  className?: string;
  /**
   * Any extra attributes to pass to the SVG element.
   */
  attributes?: SVGProps;
} & ({ size?: number } | { width?: number; height?: number });
