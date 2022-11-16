export interface IconEntity {
  contributors: Contributor[];
  name: string;
  src: string;
  tags: string[];
}

export interface Contributor {
  author: string;
}

export interface MenuItemData {
  name: string;
  isExternal?: boolean;
  href: string;
}
