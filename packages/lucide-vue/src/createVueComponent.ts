import { Component } from 'vue';
import { Vue, VueConfiguration } from 'vue/types/vue';
import defaultAttributes from './defaultAttributes';
import { toKebabCase} from '../../../scripts/helpers.mjs';

type IconNode = [elementName: string, attrs: Record<string, string>][]

export default (iconName: string, iconNode: IconNode): Component => ({
  name: iconName,
  functional: true,
  props: {
    color: {
      type: String,
      default: 'currentColor',
    },
    size: {
      type: Number,
      default: 24,
    },
    strokeWidth: {
      type: Number,
      default: 2,
    },
    absoluteStrokeWidth: {
      type: Boolean,
      default: false,
    },
    defaultClass: {
      type: String,
      default: `lucide-icon lucide lucide-${toKebabCase(iconName).replace('-icon', '')}`,
    },
  },
  render(
    createElement,
    {
      props: { color, size, strokeWidth, absoluteStrokeWidth, defaultClass },
      data,
      children = [],
    },
  ) {
    return createElement(
      'svg',
      {
        // eslint-disable-next-line prettier/prettier
        class: [defaultClass, data.class, data.staticClass, data.attrs && data.attrs.class].filter(Boolean),
        style: [data.style, data.staticStyle, data.attrs && data.attrs.style].filter(Boolean),
        attrs: {
          ...defaultAttributes,
          width: size,
          height: size,
          stroke: color,
          'stroke-width':
            absoluteStrokeWidth
              ? Number(strokeWidth) * 24 / Number(size)
              : strokeWidth,
          ...data.attrs,
        },
        on: data?.on || {}
      },
      [
        ...iconNode.map(([tag, attrs]) => createElement(String(tag), { attrs })),
        ...children
      ],
    );
  },
});
