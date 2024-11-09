import { type FunctionalComponent, h } from 'vue';
import { toKebabCase } from '@lucide/shared';
import defaultAttributes from './defaultAttributes';
import { IconNode, LucideProps } from './types';

interface IconProps {
  iconNode: IconNode;
  name: string;
}

const Icon: FunctionalComponent<LucideProps & IconProps> = (
  { size, strokeWidth = 2, absoluteStrokeWidth, color, iconNode, name, class: classes, ...props },
  { slots },
) => {
  return h(
    'svg',
    {
      ...defaultAttributes,
      width: size || defaultAttributes.width,
      height: size || defaultAttributes.height,
      stroke: color || defaultAttributes.stroke,
      'stroke-width': absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth,
      class: ['lucide', `lucide-${toKebabCase(name ?? 'icon')}`],
      ...props,
    },
    [...iconNode.map((child) => h(...child)), ...(slots.default ? [slots.default()] : [])],
  );
};

export default Icon;
