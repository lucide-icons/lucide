<script lang="ts">
  import defaultAttributes from './defaultAttributes'
  import type { IconNode } from './types';

  export let name: string | undefined = undefined
  export let color = 'currentColor'
  export let size: number | string = 24
  export let strokeWidth: number | string = 2
  export let absoluteStrokeWidth: boolean = false
  export let iconNode: IconNode = []

  const mergeClasses = <ClassType = string | undefined | null>(
    ...classes: ClassType[]
  ) => classes.filter((className, index, array) => {
      return Boolean(className) && array.indexOf(className) === index;
    })
    .join(' ');

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
  class={
    mergeClasses(
      'lucide-icon',
      'lucide',
      name ? `lucide-${name}`: '',
      $$props.class
    )
  }
>
  {#each iconNode as [tag, attrs]}
    <svelte:element this={tag} {...attrs}/>
  {/each}
  <slot />
</svg>
