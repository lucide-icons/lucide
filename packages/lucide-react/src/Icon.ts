'use client';

import { createElement, forwardRef } from 'react';
import { buildLucideIconForReact, hasA11yProp, mergeClasses } from '@lucide/shared';
import { LucideIconData, LucideIconNode, LucideProps } from './types';
import { useLucideContext } from './context';

type IconComponentProps = LucideProps &
  (
    | {
        iconNode: LucideIconNode[];
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
 * @param {string} props.className - The class name of the icon
 * @param {LucideIconNode[]} props.children - The children of the icon
 * @param {LucideIconNode[]} props.iconNode - The icon node of the icon
 *
 * @returns {ForwardRefExoticComponent} LucideIcon
 */
const Icon = forwardRef<SVGSVGElement, IconComponentProps>(
  (
    {
      color,
      size,
      width,
      height,
      strokeWidth,
      absoluteStrokeWidth,
      nonScalingStroke,
      className = '',
      children,
      iconNode = [],
      icon = {
        node: iconNode,
        aliases: [],
        size: 24,
      },
      ...rest
    },
    ref,
  ) => {
    const {
      size: contextSize = 24,
      strokeWidth: contextStrokeWidth = 2,
      absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
      nonScalingStroke: contextNonScalingStroke = false,
      color: contextColor = 'currentColor',
      className: contextClass = '',
    } = useLucideContext() ?? {};

    const hasAccessibleProp = Boolean(children) || hasA11yProp(rest);

    const [name, svgAttributes, builtIconNode = []] = buildLucideIconForReact(icon, {
      color: color ?? contextColor,
      width: width ?? size ?? contextSize,
      height: height ?? size ?? contextSize,
      strokeWidth: strokeWidth ?? contextStrokeWidth,
      absoluteStrokeWidth: absoluteStrokeWidth ?? contextAbsoluteStrokeWidth,
      nonScalingStroke: nonScalingStroke ?? contextNonScalingStroke,
      className: mergeClasses(contextClass, className),
      hasA11yProp: hasAccessibleProp,
      attributes: rest,
    });

    return createElement(
      name,
      {
        ref,
        ...svgAttributes,
      },
      [
        ...builtIconNode.map(([tag, attrs]) => createElement(tag, attrs)),
        ...(Array.isArray(children) ? children : [children]),
      ],
    );
  },
);

export default Icon;
