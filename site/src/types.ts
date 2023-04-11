import { IconNode } from "../../packages/lucide-react/dist/lucide-react";

export interface IconEntity {
  name: string;
  tags: string[];
  categories: string[];
  contributors: Contributor[];
  iconNode: IconNode;
  deprecated?: boolean;
  created?: number;
  createdRelease?: Release;
  changed?: number;
  changedRelease?: Release;
}

export interface Contributor {
  author: string;
}

export interface Category {
  name: string
  title: string
  description: string;
  icon?: IconEntity;
  iconCount: number
}

export interface Release {
  name: string;
  published: number;
  url: string;
}
