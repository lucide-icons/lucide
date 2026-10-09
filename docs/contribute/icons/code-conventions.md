---
description: Learn about allowed SVG elements and attributes, optimization, and other code conventions.
---

# SVG conventions

Before you add an icon to Lucide, make sure its SVG is readable and optimized.

## Global attributes

Each icon uses these root SVG attributes:

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

Path data can get large. Minify it to keep SVG files small.

Use [Lucide Studio](https://studio.lucide.dev/?utm_source=lucide.dev&utm_medium=design-guide) to tidy paths to 3 decimal places.

## Allowed elements

SVG files may only contain simple path and shape elements. These elements may only use sizing and position attributes.

Only these elements and attributes are allowed:

- `<path d>`
- `<line x1 y1 x2 y2>`
- `<polygon points>`
- `<polyline points>`
- `<circle cx cy r>`
- `<ellipse cx cy rx ry>`
- `<rect x y width height rx>`

Do not use transforms, filters, fills, or explicit stroke colors.

Never use [`<use>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use). It can reduce file size, but referenced IDs may conflict when SVGs are embedded in HTML.

## Metadata file

Each icon must also have a matching JSON file with contributors, use cases, tags, and categories.

See [metadata conventions](./metadata-conventions/) for details.

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

Before opening a pull request, confirm that:

- The SVG uses the standard `24 × 24` viewBox.
- The SVG uses `fill="none"` and `stroke="currentColor"`.
- Stroke width, line caps, and line joins match the Lucide defaults.
- Paths are tidy and use appropriate numeric precision.
- The SVG uses only allowed elements and attributes.
- The SVG does not use transforms, filters, fills, explicit strokes, or `<use>`.
- The icon has a matching JSON metadata file.
- `pnpm run lint:icons` passes.
- `pnpm run lint:json:icons` passes.
