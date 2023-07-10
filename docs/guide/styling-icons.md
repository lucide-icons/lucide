Lucide icons are fully customisable when using one of the official packages:
lucide, lucide-react, lucide-react-native, lucide-vue, lucide-vue-next, lucide-angular, lucide-svelte, lucide-solid.

Customisation and styling of icons for these packages can be done by using passing props to the components or by using CSS.

## Color

By default all icons have the color value: `currentColor`. This keyword uses the elements `color` value to represent the icon color. Lucide icons uses the `currentColor` value to style the stroke-width of the SVG elements.
Read more about [ `currentColor` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword)

### Using props

<!-- Example codesandbox -->

### Using parent elements

Because the color of lucide icons uses `currentColor`, the color of the icon depends on the color of the parent.

So for example if a parent element color value is `#333` and one of the children is a lucide icon, the color of the icon will be rendered  as `#333`. This is browser native behaviour.

<!-- Example codesandbox -->


## Sizing


### Resize based on font size



## Adjusting stroke width

### Absolute stroke width




## Style with CSS


## Using Tailwind


