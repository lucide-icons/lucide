import { For, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import defaultAttributes from './defaultAttributes';
import { IconNode, LucideProps } from './types';
import { mergeClasses, toKebabCase } from '@lucide/shared';

interface IconProps {
  componentName?: string;
  iconName?: string;
  iconNode: IconNode;
}

const Icon = (props: LucideProps & IconProps) => {
  const [localProps, rest] = splitProps(props, [
    'color',
    'size',
    'strokeWidth',
    'children',
    'class',
    'componentName',
    'iconName',
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
      class={mergeClasses(
        'lucide',
        'lucide-icon',
        localProps.componentName != null
          ? `lucide-${toKebabCase(localProps?.componentName)}`
          : undefined,
        localProps.iconName && `lucide-${localProps.iconName}`,
        localProps.class != null ? localProps.class : '',
      )}
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
