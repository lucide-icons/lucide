---
description: Learn about allowed SVG elements and attributes, optimization, and other code conventions.
---

# SVG conventions

Before an icon is added to the library, we like to have readable and optimized SVG code.

## Global attributes

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

## Minify paths

The code of paths can sometimes get quite large. To reduce file size we like to minify the code.
We recommend to use [Lucide Studio](https://studio.lucide.dev/?utm_source=lucide.dev&utm_medium=design-guide) to tidy paths to 3 points of precision.

## Allowed elements

SVG files may only contain simple path and shape elements, which may not have any attributes other than sizing and spacing.\
In practice only the following elements and attributes are allowed:

- `<path d>`
- `<line x1 x2>`
- `<polygon points>`
- `<polyline points>`
- `<circle cx cy r>`
- `<ellipse cx cy rx ry>`
- `<rect x y width height rx>`

This also means that no transforms, filters, fills or explicit strokes are allowed.

Never use [`<use>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use). While it may sometimes seem like a good way to optimize file size, there's no way to ensure that the referenced element IDs will be unique once the SVGs are embedded in HTML documents.

## JSON metadata descriptor

Each icon added must also come with a matching JSON file listing contributors, use cases, tags and categories for the icon.

Please use consult [our metadata conventions page](./metadata-conventions.md) for more information about this file.

## Validation

Before submitting SVG changes, format and validate the icon files:

```sh
pnpm run lint:icons
```

You can automatically format SVG files with Prettier:

```sh
pnpm run lint:icons-fix
```

To check icon names, categories, metadata, and SVG structure together, run:

```sh
pnpm run lint:icons:all
```

## Checklist

Before opening a PR, confirm that:

- The SVG uses the standard `24` by `24` viewBox.
- The SVG uses `fill="none"` and `stroke="currentColor"`.
- Stroke width, line caps, and line joins match the Lucide defaults.
- Paths are tidy and use appropriate numeric precision.
- Only allowed SVG elements and attributes are used.
- The SVG does not use transforms, filters, fills, explicit strokes, or `<use>`.
- The icon has a matching JSON metadata file.
- Ensure that `pnpm run lint:icons` passes.
- Ensure that `pnpm run lint:json:icons` passes.
