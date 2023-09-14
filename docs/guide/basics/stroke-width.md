# Stroke width

All icons are designed with SVG elements using strokes. These have a default of `2px`. This `strokeWidth` can be adjust to create a different look of the icons.

<!-- Image of icon stroke width comparison -->

## Adjusting stroke width with `strokeWidth` prop

<!-- Image of icon stroke width comparison -->

## Absolute stroke width

When adjusting the `size` prop the size of the strokeWidth will be relative to the size of the icon, this is default SVG behaviour. `absoluteStrokeWidth` prop is introduced to adjust this behaviour to make strokeWidth absolute.

This means that when `absoluteStrokeWidth` is enabled and the `size` of the icons is set to `48px` the `strokeWidth` will be still rendered `2px` on the screen.
Note 2px is default `strokeWidth`, this can be adjusted to all sizes.

<!-- Image of icon stroke comparison with absoluteStrokeWidth enabled -->

### Example with React
