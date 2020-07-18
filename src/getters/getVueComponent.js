export default (iconName, [tag, attrs, children]) => ({
  name: iconName,
  functional: true,
  render(
    createElement,
    { props: { color = 'currentColor', size = 48, strokeWidth = 2, ...rest } },
  ) {
    return createElement(
      tag,
      {
        attrs: {
          ...attrs,
          width: size,
          height: size,
          color,
          strokeWidth,
          ...rest,
        },
      },
      children.map(([tag, attrs]) => createElement(tag, { attrs })),
    );
  },
});
