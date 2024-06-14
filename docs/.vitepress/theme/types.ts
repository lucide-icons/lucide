export type IconNode = [elementName: string, attrs: Record<string, string>][];
export type IconNodeWithKeys = [elementName: string, attrs: Record<string, string>, key: string][];

export interface IconEntity {
  name: string;
  tags: string[];
  categories: string[];
  contributors: string[];
  aliases?: string[];
  iconNode: IconNode;
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
  description: string;
  icon: string;
  iconDark: string;
  shields: Shield[];
  source: string;
  documentation: string;
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
