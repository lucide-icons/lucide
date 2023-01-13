import { For, JSX, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import defaultAttributes from './defaultAttributes';
import { IconNode, LucideProps } from './types';

/**
 * Converts string to KebabCase
 * Copied from scripts/helper. If anyone knows how to properly import it here
 * then please fix it.
 *
 * @param {string} string
 * @returns {string} A kebabized string
 */
export const toKebabCase = (string: string) => string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

interface IconProps {
  name: string
  iconNode: IconNode
}

const Icon = (props: LucideProps & IconProps) => {
  const [localProps, rest] = splitProps(props, [
    'color',
    'size',
    'strokeWidth',
    'children',
    'class',
    'name',
    'iconNode'
  ]);

  return (
    <svg
      {...defaultAttributes}
      width={localProps.size ?? defaultAttributes.width}
			height={localProps.size ?? defaultAttributes.height}
			stroke={localProps.color ?? defaultAttributes.stroke}
			stroke-width={localProps.strokeWidth ?? defaultAttributes['stroke-width']}
      class={`lucide lucide-${toKebabCase(localProps?.name ?? 'icon')} ${
          localProps.class != null ? localProps.class : ''
      }`}
      {...rest}
    >
      <For each={localProps.iconNode}>
        {([elementName, attrs]) => {
          return (
            <Dynamic component={elementName} {...attrs} />
          );
        }}
      </For>
    </svg>
  )
}

export default Icon
