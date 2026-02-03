<script lang="ts">
  import defaultAttributes from './defaultAttributes.js';
  import type { IconProps } from './types.js';
  import { hasA11yProp } from './utils/hasA11yProp.js';

  const {
    name,
    color = 'currentColor',
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth = false,
    iconNode = [],
    children,
    ...props
  }: IconProps = $props();
</script>

<svg
  {...defaultAttributes}
  {...(!children && !hasA11yProp(props) && { 'aria-hidden': 'true' })}
  {...props}
  width={size}
  height={size}
  stroke={color}
  stroke-width={absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth}
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
