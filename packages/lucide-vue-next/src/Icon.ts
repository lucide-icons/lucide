import { type FunctionalComponent, h } from 'vue';
import {
  mergeClasses,
  toKebabCase,
  toPascalCase,
  isEmptyString,
  hasA11yProp,
} from '@lucide/shared';
import defaultAttributes from './defaultAttributes';
import { IconNode, LucideProps } from './types';

interface IconProps {
  iconNode: IconNode;
  name: string;
  as?: string | FunctionalComponent;
}

const Icon: FunctionalComponent<LucideProps & IconProps> = (
  {
    name,
    iconNode,
    absoluteStrokeWidth,
    'absolute-stroke-width': absoluteStrokeWidthKebabCase,
    strokeWidth,
    'stroke-width': strokeWidthKebabCase,
    as = 'svg',
    size = defaultAttributes.width,
    color = defaultAttributes.stroke,
    ...props
  },
  { slots },
) => {
  return h(
    as,
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
      ...(!slots.default && !hasA11yProp(props) && { 'aria-hidden': 'true' }),
    },
    [...iconNode.map((child) => h(...child)), ...(slots.default ? [slots.default()] : [])],
  );
};

export default Icon;
