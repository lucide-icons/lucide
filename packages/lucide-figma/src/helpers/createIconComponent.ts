import { forwardRef, createElement, SVGProps } from 'react';
import { IconNode } from '../api/fetchIcons';

const defaultAttributes = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};


export interface LucideProps extends Partial<SVGProps<SVGSVGElement>> {
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

const createIconComponent = (iconName: string, iconNode: IconNode) => {
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
        [...iconNode.map(([tag, attrs]: [tag:string, attrs: SVGProps<SVGSVGElement>]) => createElement(tag, attrs)), ...([children] || [])],
      ),
  );

  Component.displayName = `${iconName}`;

  return Component;
};

export default createIconComponent
