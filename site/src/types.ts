import { IconNode } from "../../packages/lucide-react/dist/lucide-react";

export interface IconEntity {
  name: string;
  tags: string[];
  categories: string[];
  contributors: string[];
  iconNode: IconNode;
  deprecated?: boolean;
  createdRelease?: string;
  updated?: string;
  changedRelease?: string;
}

export interface Category {
  name: string
  title: string
  description: string;
  icon?: IconEntity;
  iconCount: number
}
