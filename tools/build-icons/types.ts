import { type INode } from 'svgson';

export type SVGProps = Record<string, string | number>;

export type IconNode = [tag: string, attrs: SVGProps][];

export type IconNodeWithChildren = [tag: string, attrs: SVGProps, children: IconNode];

export type IconData = {
  name: string;
  node: IconNode;
  aliases?: string[];
} & ({ size: number } | { width: number; height: number });

export interface ExportTemplate {
  componentName: string;
  iconName: string;
  children: IconNode;
  getSvg: () => Promise<string>;
  deprecated: boolean;
  deprecationReason: string;
  aliases?: (string | AliasDeprecation)[];
  iconData: IconData;
}

export type TemplateFunction = (params: ExportTemplate) => Promise<string>;

export type Path = string;

export type AliasDeprecationReason = 'alias.typo' | 'alias.name' | 'alias.duplicate';

export type AliasDeprecation = {
  name: string;
  deprecated: true;
  deprecationReason: AliasDeprecationReason;
  toBeRemovedInVersion: string;
};

export type IconDeprecationReason = 'icon.renamed' | '';

export type IconMetadataBase = {
  toBeRemovedInVersion?: string;
  categories: string[];
  aliases?: (string | AliasDeprecation)[];
  tags: string[];
  deprecationReason?: IconDeprecationReason;
  deprecated?: boolean;
};

export type IconMetadataWithDeprecation = IconMetadataBase & {
  deprecated: true;
  deprecationReason?: IconDeprecationReason;
};

export type IconMetadata = IconMetadataBase | IconMetadataWithDeprecation;
