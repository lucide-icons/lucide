import { For, splitProps, useContext } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { buildLucideIconNode, hasA11yProp, mergeClasses } from '@lucide/shared';
import defaultAttributes from './defaultAttributes';
import { IconNode, LucideProps } from './types';
import { LucideContext } from './context';

interface IconProps {
  name?: string;
  aliases?: string[];
  iconNode: IconNode;
}

const Icon = (props: LucideProps & IconProps) => {
  const [localProps, rest] = splitProps(props, [
    'color',
    'size',
    'strokeWidth',
    'children',
    'class',
    'name',
    'aliases',
    'iconNode',
    'absoluteStrokeWidth',
  ]);

  const globalProps = useContext(LucideContext);

  const calculatedStrokeWidth =
    (localProps.absoluteStrokeWidth ?? globalProps.absoluteStrokeWidth) === true
      ? (Number(
          localProps.strokeWidth ?? globalProps.strokeWidth ?? defaultAttributes['stroke-width'],
        ) *
          24) /
        Number(localProps.size ?? globalProps.size)
      : Number(
          localProps.strokeWidth ?? globalProps.strokeWidth ?? defaultAttributes['stroke-width'],
        );

  const hasAccessibleProp = Boolean(localProps.children) || hasA11yProp(rest);

  const [, svgAttributes, builtIconNode = []] = buildLucideIconNode(
    {
      name: localProps.name,
      aliases: localProps.aliases,
      size: 24,
      node: localProps.iconNode,
    },
    {
      color: localProps.color ?? globalProps.color ?? defaultAttributes.stroke,
      size: localProps.size ?? globalProps.size ?? defaultAttributes.width,
      strokeWidth: calculatedStrokeWidth,
      className: mergeClasses('lucide-icon', globalProps.class, localProps.class),
      hasA11yProp: hasAccessibleProp,
    },
  );

  const svgElementAttributes = {
    xmlns: svgAttributes.xmlns,
    viewBox: svgAttributes.viewBox,
    fill: svgAttributes.fill,
    'stroke-linecap': svgAttributes['stroke-linecap'],
    'stroke-linejoin': svgAttributes['stroke-linejoin'],
    width: svgAttributes.width,
    height: svgAttributes.height,
    stroke: svgAttributes.stroke,
    'stroke-width': svgAttributes['stroke-width'],
    class: svgAttributes.class,
    'aria-hidden': svgAttributes['aria-hidden'],
    ...rest,
  };

  return (
    <svg {...svgElementAttributes}>
      <For each={builtIconNode}>
        {([elementName, attrs]) => {
          return (
            <Dynamic
              component={elementName}
              {...attrs}
            />
          );
        }}
      </For>
    </svg>
  );
};

export default Icon;
