import { For, splitProps, useContext } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import defaultAttributes from './defaultAttributes';
import { IconNode, LucideProps } from './types';
import { mergeClasses, toKebabCase, toPascalCase } from '@lucide/shared';
import { LucideContext } from './context';
import { hasA11yProp, mergeClasses, toKebabCase, toPascalCase } from '@lucide/shared';

interface IconProps {
  name?: string;
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

  const globalProps = useContext(LucideContext);

  return (
    <svg
      {...defaultAttributes}
      width={localProps.size ?? globalProps.size ?? defaultAttributes.width}
      height={localProps.size ?? globalProps.size ?? defaultAttributes.height}
      stroke={localProps.color ?? globalProps.color ?? defaultAttributes.stroke}
      stroke-width={
        (localProps.absoluteStrokeWidth ?? globalProps.absoluteStrokeWidth) === true
          ? (Number(
              localProps.strokeWidth ??
                globalProps.strokeWidth ??
                defaultAttributes['stroke-width'],
            ) *
              24) /
            Number(localProps.size ?? globalProps.size)
          : Number(
              localProps.strokeWidth ??
                globalProps.strokeWidth ??
                defaultAttributes['stroke-width'],
            )
      }
      class={mergeClasses(
        'lucide',
        'lucide-icon',
        globalProps.class,
        ...(localProps.name != null
          ? [
              `lucide-${toKebabCase(toPascalCase(localProps.name))}`,
              `lucide-${toKebabCase(localProps.name)}`,
            ]
          : []),
        localProps.class,
      )}
      aria-hidden={!localProps.children && !hasA11yProp(rest) ? 'true' : undefined}
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
