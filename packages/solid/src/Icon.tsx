import { children, createMemo, For, omit, useContext } from 'solid-js';
import { Dynamic } from '@solidjs/web';
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

const LOCAL_PROP_KEYS = [
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
] as const;

const Icon = (props: LucideProps & IconProps) => {
  const globalProps = useContext(LucideContext);

  const rest = () => omit(props, ...LOCAL_PROP_KEYS);
  const resolvedChildren = children(() => props.children);

  const icon = createMemo<LucideIconData>(
    () =>
      props.icon ?? {
        node: props.iconNode ?? ([] as LucideIconNode[]),
        size: 24,
        aliases: [],
      },
  );

  const hasChildren = () => resolvedChildren.toArray().some(Boolean);

  const builtIcon = createMemo(() =>
    buildLucideIconNode(icon(), {
      color: props.color ?? globalProps.color,
      width: props.width ?? props.size ?? globalProps.size,
      height: props.height ?? props.size ?? globalProps.size,
      strokeWidth: props.strokeWidth ?? globalProps.strokeWidth,
      absoluteStrokeWidth: props.absoluteStrokeWidth ?? globalProps.absoluteStrokeWidth,
      nonScalingStroke: props.nonScalingStroke ?? globalProps.nonScalingStroke,
      className: mergeClasses('lucide-icon', globalProps.class, props.class),
      hasA11yProp: hasChildren() || hasA11yProp(rest()),
      attributes: rest(),
    }),
  );

  const paths = (
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
  );

  return (
    <svg {...builtIcon()[1]}>
      {hasChildren() ? (
        <>
          {paths}
          {resolvedChildren()}
        </>
      ) : (
        paths
      )}
    </svg>
  );
};

export default Icon;
