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
export type LucideIconData = {
  name: string;
  node: LucideIconNode[];
  aliases?: string[];
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
   * Adds [`vector-effect="non-scaling-stroke"`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/vector-effect) to child elements.
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
