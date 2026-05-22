import { h, toChildArray } from 'preact';
import { buildLucideIconNode, hasA11yProp, mergeClasses } from '@lucide/shared';
import defaultAttributes from './defaultAttributes';
import type { LucideIconData, LucideIconNode, LucideProps } from './types';
import { useLucideContext } from './context';

type IconComponentProps = LucideProps &
  (
    | {
        iconNode: LucideIconNode;
        icon?: never;
      }
    | {
        icon: LucideIconData;
        iconNode?: never;
      }
  );

/**
 * Lucide icon component
 *
 * @component Icon
 * @param {object} props
 * @param {string} props.color - The color of the icon
 * @param {number} props.size - The size of the icon
 * @param {number} props.strokeWidth - The stroke width of the icon
 * @param {boolean} props.absoluteStrokeWidth - Whether to use absolute stroke width
 * @param {boolean} props.nonScalingStroke - Whether to use non scaling strokes
 * @param {string} props.class - The class name of the icon
 * @param {LucideIconNode[]} props.children - The children of the icon
 * @param {LucideIconNode[]} props.iconNode - The icon node of the icon
 *
 * @returns {ForwardRefExoticComponent} LucideIcon
 */
const Icon = ({
  color,
  size,
  width,
  height,
  strokeWidth,
  absoluteStrokeWidth,
  nonScalingStroke,
  children,
  iconNode = [],
  icon = {
    node: iconNode,
    aliases: [],
    size: 24,
  },
  class: classes = '',
  ...rest
}: IconComponentProps) => {
  const {
    size: contextSize = 24,
    strokeWidth: contextStrokeWidth = 2,
    absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
    nonScalingStroke: contextNonScalingStroke = false,
    color: contextColor = 'currentColor',
    class: contextClass = '',
  } = useLucideContext() ?? {};

  const [name, svgAttributes, builtIconNode] = buildLucideIconNode(icon, {
    color: color ?? contextColor,
    width: width ?? size ?? contextSize,
    height: height ?? size ?? contextSize,
    strokeWidth: strokeWidth ?? contextStrokeWidth,
    absoluteStrokeWidth: absoluteStrokeWidth ?? contextAbsoluteStrokeWidth,
    nonScalingStroke: nonScalingStroke ?? contextNonScalingStroke,
    className: mergeClasses(contextClass, classes as string),
    hasA11yProp: Boolean(children) || hasA11yProp(rest),
    attributes: rest,
  });

  return h(name, { ...svgAttributes }, [
    ...builtIconNode.map(([tag, attrs]) => h(tag, attrs)),
    ...toChildArray(children),
  ]);
};

export default Icon;
