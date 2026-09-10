import { createMemo, For, splitProps, useContext } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { buildLucideIconNode, hasA11yProp, mergeClasses } from '@lucide/shared';
import { LucideIconData, LucideIconNode, LucideProps } from './types';
import { LucideContext } from './context';

type IconProps =
  | {
      icon: LucideIconData;
      iconNode?: never;
    }
  | {
      icon?: never;
      iconNode?: LucideIconNode[];
    };

const Icon = (props: LucideProps & IconProps) => {
  const [localProps, rest] = splitProps(props, [
    'color',
    'size',
    'width',
    'height',
    'strokeWidth',
    'children',
    'class',
    'icon',
    'iconNode',
    'absoluteStrokeWidth',
    'nonScalingStroke',
  ]);

  const globalProps = useContext(LucideContext);

  const icon = createMemo<LucideIconData>(
    () =>
      localProps.icon ?? {
        node: localProps.iconNode ?? ([] as LucideIconNode[]),
        size: 24,
        aliases: [],
      },
  );

  const builtIcon = createMemo(() =>
    buildLucideIconNode(icon(), {
      color: localProps.color ?? globalProps.color,
      width: localProps.width ?? localProps.size ?? globalProps.size,
      height: localProps.height ?? localProps.size ?? globalProps.size,
      strokeWidth: localProps.strokeWidth ?? globalProps.strokeWidth,
      absoluteStrokeWidth: localProps.absoluteStrokeWidth ?? globalProps.absoluteStrokeWidth,
      nonScalingStroke: localProps.nonScalingStroke ?? globalProps.nonScalingStroke,
      className: mergeClasses('lucide-icon', globalProps.class, localProps.class),
      hasA11yProp: Boolean(localProps.children) || hasA11yProp(rest),
      attributes: rest,
    }),
  );

  return (
    <svg {...builtIcon()[1]}>
      <For each={builtIcon()[2] ?? []}>
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
