export type SVGProps = Record<string, string | number>;

export type LucideIconNode = [tag: string, attrs: SVGProps][];

export type LucideIconData = {
  name: string;
  node: LucideIconNode;
} & ({ size: number } | { width: number; height: number });

export type Icons = { [key: string]: LucideIconData };
