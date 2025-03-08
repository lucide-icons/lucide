import { type FunctionalComponent, h } from 'vue';
import { mergeClasses, toKebabCase } from '@lucide/shared';
import defaultAttributes from './defaultAttributes';
import { IconNode, LucideProps } from './types';

interface IconProps {
  iconNode: IconNode;
  componentName: string;
  iconName: string;
}

const Icon: FunctionalComponent<LucideProps & IconProps> = (
  {
    size,
    strokeWidth = 2,
    absoluteStrokeWidth,
    color,
    iconNode,
    componentName,
    iconName,
    class: classes,
    ...props
  },
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
      class: mergeClasses(
        `lucide lucide-${toKebabCase(componentName ?? 'icon')} lucide-${iconName}`,
      ),
      ...props,
    },
    [...iconNode.map((child) => h(...child)), ...(slots.default ? [slots.default()] : [])],
  );
};

export default Icon;
