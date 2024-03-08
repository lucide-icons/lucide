import { For, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import defaultAttributes from './defaultAttributes';
import { IconNode, LucideProps } from './types';
import { toKebabCase } from '@lucide/shared';

interface IconProps {
  name: string;
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
    'iconNode',
    'absoluteStrokeWidth',
  ]);

  return (
    <svg
      {...defaultAttributes}
      width={localProps.size ?? defaultAttributes.width}
      height={localProps.size ?? defaultAttributes.height}
      stroke={localProps.color ?? defaultAttributes.stroke}
      stroke-width={
        localProps.absoluteStrokeWidth
          ? (Number(localProps.strokeWidth ?? defaultAttributes['stroke-width']) * 24) /
            Number(localProps.size)
          : Number(localProps.strokeWidth ?? defaultAttributes['stroke-width'])
      }
      class={`lucide lucide-${toKebabCase(localProps?.name ?? 'icon')} ${
        localProps.class != null ? localProps.class : ''
      }`}
      {...rest}
    >
      <For each={localProps.iconNode}>
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
