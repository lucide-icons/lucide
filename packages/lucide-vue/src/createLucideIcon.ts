import { Component } from 'vue';
import { Vue, VueConfiguration } from 'vue/types/vue';
import defaultAttributes from './defaultAttributes';

var showDeprecationWarning = true;

type IconNode = [elementName: string, attrs: Record<string, string>][]

/**
 * Converts string to KebabCase
 * Copied from scripts/helper. If anyone knows how to properly import it here
 * then please fix it.
 *
 * @param {string} string
 * @returns {string} A kebabized string
 */
export const toKebabCase = (string: string) => string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

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
