export interface IconEntity {
  content: string;
  contributors: Contributor[];
  name: string;
  src: string;
  tags: string[];
}

export interface Contributor {
  author: string;
  commit: string;
}
