export interface IconEntity {
  contributors: Contributor[];
  name: string;
  src: string;
  tags: string[];
  categories: string[];
  changedVersion?: Release;
  deprecated: false;
  created?: number;
  changed?: number;
  createdVersion?: Release;
}

export interface CategoryEntity {
  name: string;
  title: string;
  description: string;
  icon: string;
  weight?: number;
  icons: string[];
}

export interface Contributor {
  author: string;
}

export interface MenuItemData {
  name: string;
  isExternal?: boolean;
  href: string;
}

export interface Release {
  name: string;
  published: Date;
  url: string;
}
