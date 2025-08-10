import { type FunctionalComponent, h } from 'vue';
import { mergeClasses, toKebabCase, toPascalCase } from '@lucide/shared';
import defaultAttributes from './defaultAttributes';
import { IconNode, LucideProps } from './types';
import { useLucideProps } from './context';

interface IconProps {
  iconNode: IconNode;
  name: string;
}

const Icon: FunctionalComponent<LucideProps & IconProps> = (
  { size, strokeWidth, absoluteStrokeWidth, color, iconNode, name, class: classes, ...props },
  { slots },
) => {
  const {
    size: contextSize,
    color: contextColor,
    strokeWidth: contextStrokeWidth = 2,
    absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
  } = useLucideProps();

  return h(
    'svg',
    {
      ...defaultAttributes,
      width: size ?? contextSize ?? defaultAttributes.width,
      height: size ?? contextSize ?? defaultAttributes.height,
      stroke: color ?? contextColor ?? defaultAttributes.stroke,
      'stroke-width':
          (absoluteStrokeWidth ?? contextAbsoluteStrokeWidth)
          ? (Number(strokeWidth ?? contextStrokeWidth) * 24) / Number(size ?? contextSize)
          : strokeWidth ?? contextStrokeWidth,
      class: mergeClasses(
        'lucide',
        ...(name
          ? [`lucide-${toKebabCase(toPascalCase(name))}-icon`, `lucide-${toKebabCase(name)}`]
          : ['lucide-icon']),
      ),
      ...props,
    },
    [...iconNode.map((child) => h(...child)), ...(slots.default ? [slots.default()] : [])],
  );
};

export default Icon;
