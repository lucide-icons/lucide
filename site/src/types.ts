import { IconNode } from "../../packages/lucide-react/dist/lucide-react";

export interface IconEntity {
  name: string;
  tags: string[];
  categories: string[];
  contributors: Contributor[];
  iconNode: IconNode;
  changedVersion?: Release;
  deprecated?: boolean;
  created?: number;
  changed?: number;
  createdVersion?: Release;
}

export interface Contributor {
  author: string;
}

export interface Category {
  name: string
  title: string
  description: string;
  icon?: string
  iconCount: number
}

export interface Release {
  name: string;
  published: number;
  url: string;
}
