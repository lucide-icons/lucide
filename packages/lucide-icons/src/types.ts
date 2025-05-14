export type SVGProps = Record<string, string>;

export type LucideIconNode =
  | [attrName: string, attributes: SVGProps]
  | [attrName: string, attributes: SVGProps, children: LucideIconNode[]];

export type LucideIcon = {
  name: string;
  node: LucideIconNode[];
} & ({ size: number } | { width: number; height: number });

export type LucideDynamicIconImport = () => Promise<{ default: LucideIcon }>;

export type LucideIcons = Record<string, LucideIcon>;

export type LucideBuildParams = {
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  size?: number;
  width?: number;
  height?: number;
  className?: string;
  attributes?: SVGProps;
};
