<script lang="ts">
  import buildLucideIconNode from './utils/buildLucideIconNode.js';
  import type { IconProps } from './types.js';
  import { hasA11yProp } from './utils/hasA11yProp.js';
  import { getLucideContext } from './context.js';

  const globalProps = getLucideContext() ?? {};

  const {
    name,
    aliases,
    color = globalProps.color ?? 'currentColor',
    size = globalProps.size ?? 24,
    strokeWidth = globalProps.strokeWidth ?? 2,
    absoluteStrokeWidth = globalProps.absoluteStrokeWidth ?? false,
    iconNode = [],
    children,
    ...props
  }: IconProps = $props();

  const calculatedStrokeWidth = $derived(
    absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth,
  );

  const iconClassName = $derived(
    ['lucide-icon', globalProps.class, props.class]
      .filter(
        (className): className is string =>
          typeof className === 'string' && className.trim() !== '',
      )
      .join(' '),
  );

  const hasAccessibleProp = $derived(
    Boolean(children) || hasA11yProp(props as Record<string, any>),
  );

  const [, builtSvgAttributes, builtIconNode = []] = $derived(
    buildLucideIconNode(
      {
        name,
        aliases,
        size: 24,
        node: iconNode,
      },
      {
        size,
        color,
        strokeWidth: calculatedStrokeWidth,
        className: iconClassName,
        hasA11yProp: hasAccessibleProp,
      },
    ),
  );

  const iconAttributes = $derived({
    ...builtSvgAttributes,
    ...props,
    width: builtSvgAttributes.width,
    height: builtSvgAttributes.height,
    stroke: builtSvgAttributes.stroke,
    'stroke-width': builtSvgAttributes['stroke-width'],
    class: builtSvgAttributes.class,
  });
</script>

<svg {...iconAttributes}>
  {#each builtIconNode as [tag, attrs]}
    <svelte:element
      this={tag as string}
      {...attrs}
    />
  {/each}
  {@render children?.()}
</svg>
