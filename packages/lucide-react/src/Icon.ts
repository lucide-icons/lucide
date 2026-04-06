'use client';

import { createElement, forwardRef } from 'react';
import { buildLucideIconNode, hasA11yProp, mergeClasses } from '@lucide/shared';
import defaultAttributes from './defaultAttributes';
import { LucideIconNode, LucideProps } from './types';
import { useLucideContext } from './context';

interface IconComponentProps extends LucideProps {
  name?: string;
  aliases?: string[];
  iconNode: LucideIconNode;
}

const toReactAttributeName = (attributeName: string) => {
  if (attributeName === 'class') {
    return 'className';
  }

  if (attributeName.startsWith('data-') || attributeName.startsWith('aria-')) {
    return attributeName;
  }

  return attributeName.replace(/-([a-z])/g, (_, character: string) => character.toUpperCase());
};

const toReactAttributes = (attributes: Record<string, any>) => {
  return Object.entries(attributes).reduce<Record<string, any>>((acc, [attributeName, value]) => {
    if (value === undefined) {
      return acc;
    }

    acc[toReactAttributeName(attributeName)] = value;
    return acc;
  }, {});
};

/**
 * Lucide icon component
 *
 * @component Icon
 * @param {object} props
 * @param {string} props.color - The color of the icon
 * @param {number} props.size - The size of the icon
 * @param {number} props.strokeWidth - The stroke width of the icon
 * @param {boolean} props.absoluteStrokeWidth - Whether to use absolute stroke width
 * @param {string} props.className - The class name of the icon
 * @param {LucideIconNode} props.children - The children of the icon
 * @param {LucideIconNode} props.iconNode - The icon node of the icon
 *
 * @returns {ForwardRefExoticComponent} LucideIcon
 */
const Icon = forwardRef<SVGSVGElement, IconComponentProps>(
  (
    {
      color,
      size,
      strokeWidth,
      absoluteStrokeWidth,
      className = '',
      children,
      iconNode,
      name,
      aliases,
      ...rest
    },
    ref,
  ) => {
    const {
      size: contextSize = 24,
      strokeWidth: contextStrokeWidth = 2,
      absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
      color: contextColor = 'currentColor',
      className: contextClass = '',
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
        className: mergeClasses(contextClass, className),
        hasA11yProp: hasAccessibleProp,
      },
    );

    return createElement(
      'svg',
      {
        ref,
        ...toReactAttributes(svgAttributes),
        ...rest,
      },
      [
        ...builtIconNode.map(([tag, attrs]) => createElement(tag, attrs)),
        ...(Array.isArray(children) ? children : [children]),
      ],
    );
  },
);

export default Icon;
