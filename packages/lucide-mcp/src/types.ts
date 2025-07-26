export interface IconMetadata {
  $schema?: string;
  contributors?: string[];
  tags?: string[];
  categories?: string[];
  aliases?: (string | { name: string })[];
}

export interface IconData {
  name: string;
  metadata: IconMetadata;
  svgContent: string;
}

export interface IconSearchResult {
  name: string;
  tags: string[];
  categories: string[];
  aliases: string[];
}

export interface FlavourTemplate {
  flavour: string;
  componentName: string;
  code: string;
}

export type SupportedFlavour =
  | 'react'
  | 'vue'
  | 'vue-next'
  | 'angular'
  | 'svelte'
  | 'preact'
  | 'solid'
  | 'astro'
  | 'react-native'
  | 'vanilla'
  | 'node';

export interface TemplateContext {
  componentName: string;
  iconName: string;
}
