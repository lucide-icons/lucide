export default (iconName, [tag, attrs, children]) => ({
  name: iconName,
  functional: true,
  render(
    createElement,
    { props: { color = 'currentColor', size = 24, strokeWidth = 2, ...rest } },
  ) {
    return createElement(
      tag,
      {
        attrs: {
          ...attrs,
          width: size,
          height: size,
          stroke: color,
          'stroke-width': strokeWidth,
          ...rest,
        },
      },
      children.map(([childTag, childAttrs]) => createElement(childTag, { attrs: childAttrs })),
    );
  },
});
