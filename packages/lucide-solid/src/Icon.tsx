import { For, JSX, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import defaultAttributes from './defaultAttributes';
import { LucideProps } from './types';

/**
 * Converts string to KebabCase
 * Copied from scripts/helper. If anyone knows how to properly import it here
 * then please fix it.
 *
 * @param {string} string
 * @returns {string} A kebabized string
 */
export const toKebabCase = (string: string) => string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const Icon = (props: LucideProps) => {
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
      width={localProps.size}
      height={localProps.size}
      stroke={localProps.color}
      stroke-width={localProps.strokeWidth}
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
