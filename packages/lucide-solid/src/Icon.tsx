import { For, omit, useContext } from 'solid-js';
import { Dynamic } from '@solidjs/web';
import defaultAttributes from './defaultAttributes';
import { IconNode, LucideProps } from './types';
import { LucideContext } from './context';
import { hasA11yProp, mergeClasses, toKebabCase, toPascalCase } from '@lucide/shared';

interface IconProps {
  name?: string;
  iconNode: IconNode;
}

const LOCAL_PROP_KEYS = [
  'color',
  'size',
  'strokeWidth',
  'children',
  'class',
  'name',
  'iconNode',
  'absoluteStrokeWidth',
] as const;

const Icon = (props: LucideProps & IconProps) => {
  const globalProps = useContext(LucideContext);
  const rest = () => omit(props, ...LOCAL_PROP_KEYS);

  return (
    <svg
      {...defaultAttributes}
      width={props.size ?? globalProps.size ?? defaultAttributes.width}
      height={props.size ?? globalProps.size ?? defaultAttributes.height}
      stroke={props.color ?? globalProps.color ?? defaultAttributes.stroke}
      stroke-width={
        (props.absoluteStrokeWidth ?? globalProps.absoluteStrokeWidth) === true
          ? (Number(
              props.strokeWidth ?? globalProps.strokeWidth ?? defaultAttributes['stroke-width'],
            ) *
              24) /
            Number(props.size ?? globalProps.size)
          : Number(
              props.strokeWidth ?? globalProps.strokeWidth ?? defaultAttributes['stroke-width'],
            )
      }
      class={mergeClasses(
        'lucide',
        'lucide-icon',
        globalProps.class,
        ...(props.name != null
          ? [
              `lucide-${toKebabCase(toPascalCase(props.name))}`,
              `lucide-${toKebabCase(props.name)}`,
            ]
          : []),
        props.class,
      )}
      aria-hidden={!props.children && !hasA11yProp(rest()) ? 'true' : undefined}
      {...rest()}
    >
      <For each={props.iconNode}>
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
