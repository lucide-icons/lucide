import { computed, type FunctionalComponent, h } from 'vue';
import { isEmptyString, mergeClasses, toKebabCase, toPascalCase } from '@lucide/shared';
import defaultAttributes from './defaultAttributes';
import { IconNode, LucideProps } from './types';
import { useLucideProps } from './context';

interface IconProps {
  iconNode: IconNode;
  name: string;
}

const Icon: FunctionalComponent<LucideProps & IconProps> = (
  {
    name,
    iconNode,
    absoluteStrokeWidth,
    'absolute-stroke-width': absoluteStrokeWidthKebabCase,
    strokeWidth,
    'stroke-width': strokeWidthKebabCase,
    size,
    color,
    ...props
  },
  { slots },
) => {
  const {
    size: contextSize,
    color: contextColor,
    strokeWidth: contextStrokeWidth = 2,
    absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
  } = useLucideProps();

  const calculatedStrokeWidth = computed(() => {
    const isAbsoluteStrokeWidth =
      isEmptyString(absoluteStrokeWidth) ||
      isEmptyString(absoluteStrokeWidthKebabCase) ||
      absoluteStrokeWidth === true ||
      absoluteStrokeWidthKebabCase === true ||
      contextAbsoluteStrokeWidth === true;

    const strokeWidthValue =
      strokeWidth ||
      strokeWidthKebabCase ||
      contextStrokeWidth ||
      defaultAttributes['stroke-width'];

    if (isAbsoluteStrokeWidth) {
      return (
        (Number(strokeWidthValue) * 24) / Number(size ?? contextSize ?? defaultAttributes.width)
      );
    }

    return strokeWidthValue;
  });

  return h(
    'svg',
    {
      ...defaultAttributes,
      ...props,
      width: size ?? contextSize ?? defaultAttributes.width,
      height: size ?? contextSize ?? defaultAttributes.height,
      stroke: color ?? contextColor ?? defaultAttributes.stroke,
      'stroke-width': calculatedStrokeWidth.value,
      class: mergeClasses(
        'lucide',
        ...(name
          ? [`lucide-${toKebabCase(toPascalCase(name))}-icon`, `lucide-${toKebabCase(name)}`]
          : ['lucide-icon']),
      ),
    },
    [...iconNode.map((child) => h(...child)), ...(slots.default ? [slots.default()] : [])],
  );
};

export default Icon;
