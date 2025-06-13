<script lang="ts">
  import defaultAttributes from './defaultAttributes';
  import type { IconProps } from './types';
  import { getLucideContext } from './context';

  const globalProps = getLucideContext() ?? {}

  const {
    name,
    color = globalProps.color ?? 'currentColor',
    size = globalProps.size ?? 24,
    strokeWidth = globalProps.strokeWidth ?? 2,
    absoluteStrokeWidth = globalProps.absoluteStrokeWidth ?? false,
    iconNode = [],
    children,
    ...props
  }: IconProps = $props();

  const calculatedStrokeWidth = $derived(
    absoluteStrokeWidth
      ? (Number(strokeWidth) * 24) / Number(size)
      : strokeWidth
  );
</script>

<svg
  {...defaultAttributes}
  {...props}
  width={size}
  height={size}
  stroke={color}
  stroke-width={calculatedStrokeWidth}
  class={['lucide-icon lucide', name && `lucide-${name}`, props.class]}
>
  {#each iconNode as [tag, attrs]}
    <svelte:element
      this={tag}
      {...attrs}
    />
  {/each}
  {@render children?.()}
</svg>
