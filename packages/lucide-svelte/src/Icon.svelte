<script>
  import defaultAttributes from './defaultAttributes'
  export let color = 'currentColor'
  export let size = 24
  export let strokeWidth = 2
</script>

<svg
  {...defaultAttributes}
  width={size}
  height={size}
  stroke={color}
  stroke-width={strokeWidth}
>
  <slot />
</svg>
