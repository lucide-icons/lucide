import { Component } from 'vue';
import defaultAttributes from './defaultAttributes';
import { toKebabCase } from '@lucide/shared';

var showDeprecationWarning = true;

type IconNode = [elementName: string, attrs: Record<string, string>][];

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
    { props: { color, size, strokeWidth, absoluteStrokeWidth, defaultClass }, data, children = [] },
  ) {
    if (showDeprecationWarning) {
      console.warn(
        '[Lucide Vue] This package will be deprecated end of 2023. Please upgrade to Vue 3 and use the latest lucide package for Vue.',
      );
      showDeprecationWarning = false;
    }

    return createElement(
      'svg',
      {
        // prettier-ignore
        class: [defaultClass, data.class, data.staticClass, data.attrs && data.attrs.class].filter(Boolean),
        style: [data.style, data.staticStyle, data.attrs && data.attrs.style].filter(Boolean),
        attrs: {
          ...defaultAttributes,
          width: size,
          height: size,
          stroke: color,
          'stroke-width': absoluteStrokeWidth
            ? (Number(strokeWidth) * 24) / Number(size)
            : strokeWidth,
          ...data.attrs,
        },
        on: data?.on || {},
      },
      [...iconNode.map(([tag, attrs]) => createElement(String(tag), { attrs })), ...children],
    );
  },
});
