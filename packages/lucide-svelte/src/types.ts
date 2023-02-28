/// <reference types="svelte" />
/// <reference types="svelte2tsx/svelte-jsx" />

export type Attrs = svelte.JSX.SVGProps<SVGSVGElement>
export type IconNode = [elementName: keyof svelte.JSX.IntrinsicElements, attrs: Attrs][]
