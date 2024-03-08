import {
  forwardRef,
  createElement,
} from 'react';
import defaultAttributes from './defaultAttributes';
import { toKebabCase } from '@lucide/shared';
import { IconNode, LucideIcon, LucideProps } from './types';

const createLucideIcon = (iconName: string, iconNode: IconNode): LucideIcon => {
  const Component = forwardRef<SVGSVGElement, LucideProps>(
    (
      {
        color = 'currentColor',
        size = 24,
        strokeWidth = 2,
        absoluteStrokeWidth,
        className = '',
        children,
        ...rest
      },
      ref,
    ) => {
      return createElement(
        'svg',
        {
          ref,
          ...defaultAttributes,
          width: size,
          height: size,
          stroke: color,
          strokeWidth: absoluteStrokeWidth
            ? (Number(strokeWidth) * 24) / Number(size)
            : strokeWidth,
          className: ['lucide', `lucide-${toKebabCase(iconName)}`, className].join(' '),
          ...rest,
        },
        [
          ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
          ...(Array.isArray(children) ? children : [children]),
        ],
      );
    },
  );

  Component.displayName = `${iconName}`;

  return Component;
};

export default createLucideIcon;
