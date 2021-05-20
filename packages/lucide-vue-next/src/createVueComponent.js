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
        width: props.size || defaultAttributes.width,
        height: props.size || defaultAttributes.height
      }
    },
    iconNode.map(child => h(...child)),
  );

export default createVueComponent;
