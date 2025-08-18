import { h, toChildArray } from 'preact';
import defaultAttributes from './defaultAttributes';
import type { IconNode, LucideProps } from './types';
import { hasA11yProp } from '@lucide/shared';

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
  color = 'currentColor',
  size = 24,
  strokeWidth = 2,
  absoluteStrokeWidth,
  children,
  iconNode,
  class: classes = '',
  ...rest
}: IconComponentProps) =>
  h(
    'svg',
    {
      ...defaultAttributes,
      width: String(size),
      height: size,
      stroke: color,
      ['stroke-width' as 'strokeWidth']: absoluteStrokeWidth
        ? (Number(strokeWidth) * 24) / Number(size)
        : strokeWidth,
      class: ['lucide', classes].join(' '),
      ...(!children && !hasA11yProp(rest) && { 'aria-hidden': 'true' }),
      ...rest,
    },
    [...iconNode.map(([tag, attrs]) => h(tag, attrs)), ...toChildArray(children)],
  );

export default Icon;
