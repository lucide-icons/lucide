import {
  createElement,
  forwardRef,
} from 'react';
import { toKebabCase } from '@lucide/shared';
import { IconNode, LucideProps } from './types';
import Icon from './Icon';

const createLucideIcon = (iconName: string, iconNode: IconNode) => {
  const Component = forwardRef<SVGSVGElement, LucideProps>(
    ({ className, ...props}, ref) => createElement(
      Icon,
      {
        ref,
        iconNode,
        className: [`lucide-${toKebabCase(iconName)}`, className].join(' '),
        ...props,
      },
    )
  );

  Component.displayName = `${iconName}`;

  return Component;
};

export default createLucideIcon;
