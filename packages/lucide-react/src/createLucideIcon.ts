import { forwardRef, createElement, ReactSVG, SVGProps } from 'react';
import defaultAttributes from './defaultAttributes';

export type IconNode = [elementName: keyof ReactSVG, attrs: Record<string, string>][]

export type SVGAttributes = Partial<SVGProps<SVGSVGElement>>

export interface LucideProps extends SVGAttributes {
  size?: string | number
}
/**
 * Converts string to KebabCase
 * Copied from scripts/helper. If anyone knows how to properly import it here
 * then please fix it.
 *
 * @param {string} string
 * @returns {string} A kebabized string
 */
export const toKebabCase = (string: string) => string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const createLucideIcon = (iconName: string, iconNode: IconNode) => {
  const Component = forwardRef<SVGSVGElement, LucideProps>(
    ({ color = 'currentColor', size = 24, strokeWidth = 2, children, ...rest }, ref) =>
      createElement(
        'svg',
        {
          ref,
          ...defaultAttributes,
          width: size,
          height: size,
          stroke: color,
          strokeWidth,
          className: `lucide lucide-${toKebabCase(iconName)}`,
          ...rest,
        },
        [
          ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
          ...(
            (Array.isArray(children) ? children : [children]) || []
          )
        ],
      ),
  );

  Component.displayName = `${iconName}`;

  return Component;
};

export default createLucideIcon
