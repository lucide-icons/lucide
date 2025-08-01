import { type FunctionalComponent, h } from 'vue';
import { mergeClasses, toKebabCase, toPascalCase, isEmptyString } from '@lucide/shared';
import defaultAttributes from './defaultAttributes';
import { IconNode, LucideProps } from './types';

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
    size = defaultAttributes.width,
    color = defaultAttributes.stroke,
    ...props
  },
  { slots },
) => {
  return h(
    'svg',
    {
      ...defaultAttributes,
      ...props,
      width: size,
      height: size,
      stroke: color,
      'stroke-width':
        isEmptyString(absoluteStrokeWidth) ||
        isEmptyString(absoluteStrokeWidthKebabCase) ||
        absoluteStrokeWidth === true ||
        absoluteStrokeWidthKebabCase === true
          ? (Number(strokeWidth || strokeWidthKebabCase || defaultAttributes['stroke-width']) *
              24) /
            Number(size)
          : strokeWidth || strokeWidthKebabCase || defaultAttributes['stroke-width'],
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
