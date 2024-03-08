import { h } from 'vue';
import type { SVGAttributes, FunctionalComponent } from 'vue';
import defaultAttributes from './defaultAttributes';
import { toKebabCase } from '@lucide/shared';

// Create interface extending SVGAttributes
export interface LucideProps extends Partial<SVGAttributes> {
  size?: 24 | number
  strokeWidth?: number | string
  absoluteStrokeWidth?: boolean
}

export type IconNode = [elementName: string, attrs: Record<string, string>][]
export type LucideIcon = FunctionalComponent<LucideProps>

// Legacy exports
export type SVGProps = LucideProps
export type Icon = LucideIcon
/**
 * Create a Lucide icon component
 * @param {string} iconName
 * @param {array} iconNode
 * @returns {FunctionalComponent} LucideIcon
 */
const createLucideIcon =
  (iconName: string, iconNode: IconNode): Icon =>
  (
    { size, strokeWidth = 2, absoluteStrokeWidth, color, class: classes, ...props }, // props
    { attrs, slots }, // context
  ) => {
    return h(
      'svg',
      {
        ...defaultAttributes,
        width: size || defaultAttributes.width,
        height: size || defaultAttributes.height,
        stroke: color || defaultAttributes.stroke,
        'stroke-width': absoluteStrokeWidth
          ? (Number(strokeWidth) * 24) / Number(size)
          : strokeWidth,
        ...attrs,
        class: ['lucide', `lucide-${toKebabCase(iconName)}`],
        ...props,
      },
      [...iconNode.map((child) => h(...child)), ...(slots.default ? [slots.default()] : [])],
    );
  };

export default createLucideIcon;
