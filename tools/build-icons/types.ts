import { type INode } from "svgson";

export type SVGProps = Record<string, string | number>;

export type IconNode = [tag: string, attrs: SVGProps][];

export type IconNodeWithChildren = [tag: string, attrs: SVGProps, children: IconNode];

export type TemplateFunction = (params: {
    componentName: string;
    iconName: string;
    children: INode;
    getSvg: () => Promise<string>;
    deprecated?: boolean;
    deprecationReason?: string;
  }) => Promise<string>;

export type Path = string

export type AliasDeprecationReason =  'alias.typo' | 'alias.name' | 'alias.duplicate'

export type AliasDeprecation = {
  name: string
  deprecated: true
  deprecationReason: AliasDeprecationReason
  toBeRemovedInVersion: string
}

export type IconDeprecationReason = 'icon.brand';

export type IconDeprecation = {
  deprecated: true;
  deprecationReason?: IconDeprecationReason;
}

export type IconMetadataBase = {
  toBeRemovedInVersion?: string;
  categories?: string[];
  aliases?: (string | AliasDeprecation)[];
  tags?: string[];
}

export type IconMetadata = IconMetadataBase | (IconMetadataBase & IconDeprecation);
