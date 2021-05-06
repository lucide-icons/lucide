import { h } from 'vue';
import defaultAttributes from './defaultAttributes';

const createVueComponent = (iconName, iconNode) => (props, context) =>
  h(
    'svg',
    {
      ...defaultAttributes,
      ...context.attrs,
      ...props,
      ...{
        width: props.size || context.attrs.size || defaultAttributes.size,
        height: props.size || context.attrs.size || defaultAttributes.size
      }
    },
    iconNode.map(child => h(...child)),
  );

export default createVueComponent;
