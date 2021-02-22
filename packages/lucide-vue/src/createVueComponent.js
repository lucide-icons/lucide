export default (iconName, [tag, defaultAttrs, children]) => ({
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
    defaultClass: {
      type: String,
      default: 'lucide-icon',
    },
  },
  render(
    createElement,
    {
      props: { color, size, strokeWidth, defaultClass },
      data,
    },
  ) {
    return createElement(
      tag,
      {
        // eslint-disable-next-line prettier/prettier
        class: [defaultClass, data.class, data.staticClass, data.attrs && data.attrs.class].filter(Boolean),
        style: [data.style, data.staticStyle, data.attrs && data.attrs.style].filter(Boolean),
        attrs: {
          ...defaultAttrs,
          width: size,
          height: size,
          stroke: color,
          'stroke-width': strokeWidth,
          ...data.attrs,
        },
      },
      children.map(([childTag, childAttrs]) => createElement(childTag, { attrs: childAttrs })),
    );
  },
});
