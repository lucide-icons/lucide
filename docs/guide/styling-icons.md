Lucide icons are fully customisable when using one of the official packages:
lucide, lucide-react, lucide-react-native, lucide-vue, lucide-vue-next, lucide-angular, lucide-svelte, lucide-solid.

Customization and styling of icons for these packages can be done by using passing props to the components or by using CSS.

## Color

By default all icons have the color value: `currentColor`. This keyword uses the elements computed text `color` value to represent the icon color.

Read more about [ `currentColor` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword)

### Using parent elements text color value

Because the color of lucide icons uses `currentColor`, the color of the icon depends on the color of the parent.

So for example if a parent element color value is `#333` and one of the children is a lucide icon, the color of the icon will be rendered  as `#333`. This is browser native behaviour.

**Example using a Button component**

<!-- Example codesandbox -->

### Adjust the color using props

By passing props the color can adjusted by using the color prop on the element.

<!-- Example codesandbox -->

## Sizing

By default the size of the icons are `24px` . This is adjustable by using passing the `size` prop or change it by using CSS.

### Adjusting size with `size` prop

<!-- Example codesandbox -->

### Adjusting size with CSS
Width and height can be used to adjust icon size.

<!-- Code Example -->

#### Resize based on font size

It is possible to resize icons based on font size. This can be accomplished by using the `em` 's to resize based on font size.

<!-- Code Example or  Example codesandbox -->

#### Resizing with Tailwind

`h-*` and `w-*` utlities can be used to adjust the size of the icon.

<!-- Code Example -->

## Stroke width

All icons are designed with SVG elements using strokes. These have a default of `2px`. This strokeWidth can be adjust to create a different look of the icons.

%%Image of icon stroke width comparison %%


### Absolute stroke width

When adjusting the `size` prop the size of the strokeWidth will be relative to the size of the icon, this is default SVG behaviour. `absoluteStrokeWidth` prop is introduced to adjust this behaviour to make strokeWidth absolute. This means that when `absoluteStrokeWidth` is enabled and the `size` of the icons is set to `48px` the `strokeWidth` will be still rendered `2px` on the screen.
Note 2px is default `strokeWidth`, this can be adjusted to all sizes.

%%Image of icon stork comparison with absoluteStrokeWidth enabled %%


## Fill

Fills are officially not supported.
However all SVG properties are available on the icons.
Fill can still be used, and will work fine on certain icons.

Example with stars:

### Will Lucide have fills in the future?
This feature is requested several times, so maybe it will be considered in future projects.
