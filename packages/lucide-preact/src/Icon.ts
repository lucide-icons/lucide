import { h, toChildArray } from 'preact';
import { buildLucideIconNode, hasA11yProp, mergeClasses } from '@lucide/shared';
import defaultAttributes from './defaultAttributes';
import type { LucideIconNode, LucideProps } from './types';
import { useLucideContext } from './context';

interface IconComponentProps extends LucideProps {
  name?: string;
  aliases?: string[];
  iconNode: LucideIconNode;
}

/**
 * Lucide icon component
 *
 * @component Icon
 * @param {object} props
 * @param {string} props.color - The color of the icon
 * @param {number} props.size - The size of the icon
 * @param {number} props.strokeWidth - The stroke width of the icon
 * @param {boolean} props.absoluteStrokeWidth - Whether to use absolute stroke width
 * @param {string} props.class - The class name of the icon
 * @param {LucideIconNode} props.children - The children of the icon
 * @param {LucideIconNode} props.iconNode - The icon node of the icon
 *
 * @returns {ForwardRefExoticComponent} LucideIcon
 */
const Icon = ({
  color,
  size,
  strokeWidth,
  absoluteStrokeWidth,
  children,
  iconNode,
  name,
  aliases,
  class: classes = '',
  ...rest
}: IconComponentProps) => {
  const {
    size: contextSize = 24,
    strokeWidth: contextStrokeWidth = 2,
    absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
    color: contextColor = 'currentColor',
    class: contextClass = '',
  } = useLucideContext() ?? {};

  const calculatedStrokeWidth =
    absoluteStrokeWidth ?? contextAbsoluteStrokeWidth
      ? (Number(strokeWidth ?? contextStrokeWidth) * 24) / Number(size ?? contextSize)
      : strokeWidth ?? contextStrokeWidth;

  const hasAccessibleProp = Boolean(children) || hasA11yProp(rest);

  const [, svgAttributes, builtIconNode = []] = buildLucideIconNode(
    {
      name,
      aliases,
      size: 24,
      node: iconNode,
    },
    {
      color: color ?? contextColor,
      size: size ?? contextSize ?? defaultAttributes.width,
      strokeWidth: calculatedStrokeWidth,
      className: mergeClasses(contextClass, classes as string),
      hasA11yProp: hasAccessibleProp,
    },
  );

  return h('svg', { ...svgAttributes, ...rest }, [
    ...builtIconNode.map(([tag, attrs]) => h(tag, attrs)),
    ...toChildArray(children),
  ]);
};

export default Icon;
