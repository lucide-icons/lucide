import { type FunctionalComponent, h } from 'vue';
import {
  buildLucideIconNode,
  hasA11yProp,
  isEmptyString,
  mergeClasses,
  toKebabCase,
} from '@lucide/shared';
import { LucideIconNode, LucideIconData, LucideProps } from './types';
import { useLucideProps } from './context';

type IconProps =
  | {
      icon: LucideIconData;
      iconNode?: never;
      name?: never;
    }
  | {
      icon?: never;
      iconNode: LucideIconNode[];
      name: string;
    };

const Icon: FunctionalComponent<LucideProps & IconProps> = (
  {
    name,
    iconNode = [],
    icon = {
      name: toKebabCase(name),
      node: iconNode,
      size: 24,
      aliases: [],
    },
    absoluteStrokeWidth,
    'absolute-stroke-width': absoluteStrokeWidthKebabCase,
    nonScalingStroke,
    'non-scaling-stroke': nonScalingStrokeKebabCase,
    strokeWidth,
    'stroke-width': strokeWidthKebabCase,
    size,
    width = size,
    height = size,
    color,
    class: classes = '',
    ...props
  },
  { slots },
) => {
  const {
    size: contextSize,
    color: contextColor,
    strokeWidth: contextStrokeWidth = 2,
    absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
    nonScalingStroke: contextNonScalingStroke = false,
    class: contextClass = '',
  } = useLucideProps();

  const isAbsoluteStrokeWidth =
    isEmptyString(absoluteStrokeWidth) ||
    isEmptyString(absoluteStrokeWidthKebabCase) ||
    absoluteStrokeWidth === true ||
    absoluteStrokeWidthKebabCase === true ||
    contextAbsoluteStrokeWidth === true;

  const isNonScalingStroke =
    isEmptyString(nonScalingStroke) ||
    isEmptyString(nonScalingStrokeKebabCase) ||
    nonScalingStroke === true ||
    nonScalingStrokeKebabCase === true ||
    contextNonScalingStroke === true;

  const { class: propsClass, ...restProps } = props;

  const [, svgAttributes, builtIconNode = []] = buildLucideIconNode(icon, {
    color: color ?? contextColor,
    width: width ?? size ?? contextSize,
    height: height ?? size ?? contextSize,
    strokeWidth: strokeWidth ?? strokeWidthKebabCase ?? contextStrokeWidth,
    absoluteStrokeWidth: isAbsoluteStrokeWidth,
    nonScalingStroke: isNonScalingStroke,
    className: mergeClasses(contextClass, propsClass),
    hasA11yProp: !!slots || hasA11yProp(restProps),
    attributes: restProps,
  });

  return h('svg', svgAttributes, [
    ...builtIconNode.map((child) => h(...child)),
    ...(slots.default ? [slots.default()] : []),
  ]);
};

export default Icon;
