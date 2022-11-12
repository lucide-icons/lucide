import React, { forwardRef, createElement, ReactSVG, SVGProps } from 'react';
import PropTypes from 'prop-types';
import { IconNode } from 'lucide'

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
export const toKebabCase = (string: string): string => string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

export function createReactComponent (iconName: string, [_tag, DEFAULT_ATTRIBUTES, nodeChildren=[]]: IconNode) {
  const Component = forwardRef<SVGSVGElement, LucideProps>(
    ({ color = 'currentColor', size = 24, strokeWidth = 2, children, ...rest }, ref) =>
      createElement(
        'svg',
        {
          ref,
          ...DEFAULT_ATTRIBUTES,
          width: size,
          height: size,
          stroke: color,
          strokeWidth,
          className: `lucide lucide-${toKebabCase(iconName)}`,
          ...rest,
        },
        [
          ...nodeChildren.map(([tag, attrs]) => createElement(tag, attrs)),
          ...(
            (Array.isArray(children) ? children : [children]) || []
          )
        ],
      ),
  );

  Component.propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    strokeWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  Component.displayName = `${iconName}`;

  return Component;
};
