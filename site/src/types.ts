import { IconNode } from "../../packages/lucide-react/dist/lucide-react";

export interface IconEntity {
  name: string;
  tags: string[];
  categories: string[];
  contributors: Contributor[];
  iconNode: IconNode;
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
