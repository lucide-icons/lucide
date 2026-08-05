## Code Conventions

Before an icon is added to the library, we like to have readable and optimized SVG code.

### Global Attributes

For each icon these attributes are applied, corresponding to the above rules.

```xml
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <!-- SVGElements -->
</svg>
```

### Minify paths

The code of paths can sometimes get quite large. To reduce file size we like to minify the code.
We recommend to use [Lucide Studio](https://studio.lucide.dev/?utm_source=lucide.dev&utm_medium=design-guide) to tidy paths to 3 points of precision.

### Allowed elements

SVG files may only contain simple path and shape elements, which may not have any attributes other than sizing and spacing.\
In practice only the following elements and attributes are allowed:
* `<path d>`
* `<line x1 x2>`
* `<polygon points>`
* `<polyline points>`
* `<circle cx cy r>`
* `<ellipse cx cy rx ry>`
* `<rect x y width height rx>`

This also means that no transforms, filters, fills or explicit strokes are allowed.

Never use [`<use>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use). While it may sometimes seem like a good way to optimize file size, there's no way to ensure that the referenced element IDs will be unique once the SVGs are embedded in HTML documents.

## JSON metadata descriptor

<!-- TODO: Add use-case explanation -->

Each icon added must also come with a matching JSON file listing tags and categories for the icon.
Please use the following template:

```json
{
  "$schema": "../icon.schema.json",
  "contributors": [
    "github-username",
    "another-github-username"
  ],
  "tags": [
    "foo",
    "bar"
  ],
  "categories": [
    "devices"
  ]
}
```
