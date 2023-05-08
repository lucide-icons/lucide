export type IconNode = [elementName: string, attrs: Record<string, string>][]

export interface IconEntity {
  name: string;
  tags: string[];
  categories: string[];
  contributors: Contributor[];
  iconNode: IconNode;
  createdRelease?: Release;
  changedRelease?: Release;
}

export interface Contributor {
  author: string;
}

export interface Category {
  name: string
  title: string
  icon?: string
  iconCount: number
}

interface Shield {
  alt: string
  src: string
  href: string
}

export interface PackageItem {
  name: string
  description: string
  icon: string
  shields: Shield[]
  source: string
  documentation: string
  order?: number
  private?: boolean
  flutter?: object
}


export interface Release {
  version: string
  date: string
}
