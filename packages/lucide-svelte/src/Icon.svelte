<script lang="ts">
	import { getContext } from 'svelte';

  import defaultAttributes from './defaultAttributes'
  import type { IconNode } from './types';

  export let name: string
  export let color = getContext('lucide-icon-color') ?? 'currentColor'
  export let size: number | string = getContext('lucide-icon-size') ?? 24
  export let strokeWidth: number | string = getContext('lucide-icon-stroke-width') ?? 2
  export let absoluteStrokeWidth: boolean = getContext('lucide-icon-absolute-stroke-width') ?? false
  export let iconNode: IconNode
</script>

<svg
  {...defaultAttributes}
  {...$$restProps}
  width={size}
  height={size}
  stroke={color}
  stroke-width={
    absoluteStrokeWidth
      ? Number(strokeWidth) * 24 / Number(size)
      : strokeWidth
  }
  class={`lucide-icon lucide lucide-${name} ${$$props.class ?? ''}`}
>
  {#each iconNode as [tag, attrs]}
    <svelte:element this={tag} {...attrs}/>
  {/each}
  <slot />
</svg>
