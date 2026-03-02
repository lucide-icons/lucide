import { forwardRef, createElement } from 'react';
import Icon from './Icon';
import { IconNode, LucideIcon, LucideProps } from './types';

const createLucideIcon = (iconName: string, iconNode: IconNode): LucideIcon => {
  const Component = forwardRef<SVGSVGElement, LucideProps>((props, ref) =>
    createElement(Icon, {
      ref,
      iconNode,
      ...props,
    }),
  );

  Component.displayName = `${iconName}`;

  return Component;
};

export default createLucideIcon;
