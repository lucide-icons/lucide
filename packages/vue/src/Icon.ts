import { computed, type FunctionalComponent, h } from 'vue';
import { buildLucideIconNode, isEmptyString, toKebabCase } from '@lucide/shared';
import defaultAttributes from './defaultAttributes';
import { IconNode, LucideProps } from './types';
import { useLucideProps } from './context';

interface IconProps {
  iconNode: IconNode;
  name: string;
  aliases?: string[];
}

const Icon: FunctionalComponent<LucideProps & IconProps> = (
  {
    name,
    aliases,
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
    class: contextClass = '',
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

  const normalizedName = computed(() => (name != null ? toKebabCase(name) : undefined));

  const iconName = computed(() => (normalizedName.value ? `${normalizedName.value}-icon` : 'icon'));

  const [, svgAttributes, builtIconNode = []] = buildLucideIconNode(
    {
      name: iconName.value,
      aliases,
      size: 24,
      node: iconNode,
    },
    {
      size: size ?? contextSize ?? defaultAttributes.width,
      color: color ?? contextColor ?? defaultAttributes.stroke,
      strokeWidth: calculatedStrokeWidth.value,
      className: contextClass,
    },
  );

  const iconAttributes = {
    ...svgAttributes,
    ...props,
    width: svgAttributes.width,
    height: svgAttributes.height,
    stroke: svgAttributes.stroke,
    'stroke-width': svgAttributes['stroke-width'],
    class: svgAttributes.class,
  };

  return h('svg', iconAttributes, [
    ...builtIconNode.map((child) => h(...child)),
    ...(slots.default ? [slots.default()] : []),
  ]);
};

export default Icon;
