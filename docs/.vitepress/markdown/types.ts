import type { MarkdownRenderer } from 'vitepress';

// VitePress 1.x renders with markdown-it 14, so derive the plugin types from its renderer
// instead of the markdown-it 15 package installed in docs.
export type MarkdownIt = MarkdownRenderer;
export type RenderRule = NonNullable<MarkdownIt['renderer']['rules'][string]>;
export type Token = Parameters<RenderRule>[0][number];
