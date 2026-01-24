export type IconNode = [elementName: string, attrs: Record<string, string>][];
export type IconNodeWithKeys = [elementName: string, attrs: Record<string, string>, key: string][];

export interface IconMetaData {
  tags: string[];
  categories: string[];
  contributors: string[];
  aliases?: string[];
  deprecated?: boolean;
  deprecationReason?: string;
  toBeRemovedInVersion?: string;
}

export type ExternalLibs = 'lab';
export interface IconEntity extends IconMetaData {
  name: string;
  iconNode: IconNode;
  externalLibrary?: ExternalLibs;
  createdRelease?: Release;
  changedRelease?: Release;
}

export interface Category {
  name: string;
  title: string;
  icon?: string;
  iconCount: number;
  icons?: IconEntity[];
}

interface Shield {
  alt: string;
  src: string;
  href: string;
}

export interface PackageItem {
  name: string;
  // set when the package's directory
  // name under the `packages/` directory
  // is diffrent from the package name
  packageDirname?: string;
  description: string;
  icon: string;
  iconDark: string;
  shields: Shield[];
  source: string;
  documentation: string;
  // set when the docs page name is
  // diffrent from the package name
  docsAlias?: string;
  order?: number;
  private?: boolean;
  flutter?: object;
}

export interface Release {
  version: string;
  date: string;
}

interface ShowcaseItemImage {
  light: string;
  dark: string;
}

export interface ShowcaseItem {
  name: string;
  url: string;
  image: ShowcaseItemImage;
}
