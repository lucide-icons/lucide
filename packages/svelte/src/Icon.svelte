<script lang="ts">
  import buildLucideIconNode from './utils/buildLucideIconNode.js';
  import type {IconProps} from './types.js';
  import { hasA11yProp } from './utils/hasA11yProp.js';
  import { getLucideContext } from './context.js';
  import {mergeClasses} from './utils/mergeClasses.js';
  import type {ClassValue} from "svelte/elements";

  const globalProps = getLucideContext() ?? {};

  const {
    color = globalProps.color ?? 'currentColor',
    size = globalProps.size ?? 24,
    width = size,
    height = size,
    strokeWidth = globalProps.strokeWidth ?? 2,
    absoluteStrokeWidth = globalProps.absoluteStrokeWidth ?? false,
    nonScalingStroke = globalProps.nonScalingStroke ?? false,
    iconNode = [],
    icon = {
      node: iconNode,
      aliases: [],
      size: 24,
    },
    class: propsClass,
    children,
    ...props
  }: IconProps = $props();

  const hasAccessibleProp = $derived(
    Boolean(children) || hasA11yProp(props as Record<string, any>),
  );

  const [, svgAttributes, builtIconNode] = $derived(
    buildLucideIconNode(
      icon,
      {
        color,
        width,
        height,
        strokeWidth,
        absoluteStrokeWidth,
        nonScalingStroke,
        // @TODO: maybe drop the extra `lucide-icon` class altogether.
        className: mergeClasses<ClassValue | null | undefined>('lucide-icon', propsClass),
        hasA11yProp: hasAccessibleProp,
        attributes: props,
      },
    ),
  );

  const iconAttributes = $derived({
    ...svgAttributes,
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
