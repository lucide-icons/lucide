import { type FunctionalComponent, h } from 'vue';
import { mergeClasses, toKebabCase, toPascalCase } from '@lucide/shared';
import defaultAttributes from './defaultAttributes';
import { IconNode, LucideProps } from './types';

interface IconProps {
  iconNode: IconNode;
  name: string;
}

const Icon: FunctionalComponent<LucideProps & IconProps> = (
  {name, iconNode, ...props},
  { slots },
) => {
  const size = props.size || defaultAttributes.width;
  const color = props.color || defaultAttributes.stroke;
  const strokeWidth = props['strokeWidth'] || props['stroke-width'] || defaultAttributes['stroke-width'];
  const absoluteStrokeWidth = props['absoluteStrokeWidth'] || props['absolute-stroke-width'];

  return h(
    'svg',
    {
      ...defaultAttributes,
      ...props,
      width: size,
      height: size,
      stroke: color,
      'stroke-width': absoluteStrokeWidth != null ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth,
      class: mergeClasses(
        'lucide',
        props.class,
        ...(name
          ? [`lucide-${toKebabCase(toPascalCase(name))}-icon`, `lucide-${toKebabCase(name)}`]
          : ['lucide-icon']),
      ),
    },
    [...iconNode.map((child) => h(...child)), ...(slots.default ? [slots.default()] : [])],
  );
};

export default Icon;
