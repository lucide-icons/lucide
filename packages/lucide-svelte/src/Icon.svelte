<script lang="ts">
  import defaultAttributes from './defaultAttributes';
  import type { IconNode } from './types';
  import type { SvelteHTMLElements } from 'svelte/elements';

  const {
    class: className,
    children,

    name = undefined,
    color = 'currentColor',
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth = false,
    iconNode = [],

    ...props
  }: SvelteHTMLElements['svg'] & {
    name: string | undefined;
    color: string;
    size: number | string;
    strokeWidth: number | string;
    absoluteStrokeWidth: boolean;
    iconNode: IconNode;
  } = $props();

  const mergeClasses = <ClassType = string | undefined | null,>(...classes: ClassType[]) =>
    classes
      .filter((className, index, array) => {
        return Boolean(className) && array.indexOf(className) === index;
      })
      .join(' ');
</script>

<svg
  {...defaultAttributes}
  {...props}
  width={size}
  height={size}
  stroke={color}
  stroke-width={absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth}
  class={mergeClasses('lucide-icon', 'lucide', name ? `lucide-${name}` : '', className)}
>
  {#each iconNode as [tag, attrs]}
    <svelte:element
      this={tag}
      {...attrs}
    />
  {/each}
  {@render children?.()}
</svg>
