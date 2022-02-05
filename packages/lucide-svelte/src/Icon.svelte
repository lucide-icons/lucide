<script>
  import defaultAttributes from './defaultAttributes'
  export let name
  export let color = 'currentColor'
  export let size = 24
  export let strokeWidth = 2
</script>

<svg
  {...defaultAttributes}
  {...$$restProps}
  width={size}
  height={size}
  stroke={color}
  stroke-width={strokeWidth}
  class={`lucide-icon lucide lucide-${name} ${$$props.class ?? ''}`}
>
  <slot />
</svg>
