import { h } from 'preact';
import defaultAttributes from './defaultAttributes';

export default (iconName, iconNode) => {
  const Component = ({ color = 'currentColor', size = 24, strokeWidth = 2, ...rest }) =>
    h(
      'svg',
      {
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        'stroke-width': strokeWidth,
        ...rest,
      },
      iconNode.map(([tag, attrs]) => h(tag, attrs)),
    );

  Component.displayName = `${iconName}`;

  return Component;
};
