import { h, toChildArray } from 'preact';
import defaultAttributes from './defaultAttributes';
import type { IconNode, LucideProps } from './types';
import { useLucideContext } from './context';

interface IconComponentProps extends LucideProps {
  iconNode: IconNode;
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
 * @param {IconNode} props.children - The children of the icon
 * @param {IconNode} props.iconNode - The icon node of the icon
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
  class: classes = '',
  ...rest
}: IconComponentProps) => {
  const {
    size: contextSize = 24,
    strokeWidth: contextStrokeWidth = 2,
    absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
    color: contextColor = 'currentColor',
  } = useLucideContext() ?? {};

  const calculatedStrokeWidth =
    absoluteStrokeWidth ?? contextAbsoluteStrokeWidth
      ? (Number(strokeWidth ?? contextStrokeWidth) * 24) / Number(size ?? contextSize)
      : strokeWidth ?? contextStrokeWidth;

  return h(
    'svg',
    {
      ...defaultAttributes,
      width: size ?? contextSize ?? 24,
      height: size ?? contextSize ?? 24,
      stroke: color ?? contextColor,
      ['stroke-width' as 'strokeWidth']: calculatedStrokeWidth,
      class: ['lucide', classes].join(' '),
      ...rest,
    },
    [...iconNode.map(([tag, attrs]) => h(tag, attrs)), ...toChildArray(children)],
  );
};

export default Icon;
