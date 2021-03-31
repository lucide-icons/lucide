import { h } from 'vue';
import defaultAttributes from './defaultAttributes';

const createLucideIcon = (iconName, iconNode) => (props, context) =>
  h(
    'svg',
    {
      ...defaultAttributes,
      ...context.attrs,
      ...props,
    },
    iconNode.map(child => h(...child)),
  );

export default createLucideIcon;
