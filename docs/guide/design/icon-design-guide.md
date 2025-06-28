---
title: Icon Design Guide
---

## Icon Design Principles

Here are rules that should be followed to keep quality and consistency when making icons for Lucide.

### 1. Icons must be designed on a **24 by 24 pixels** canvas.

![24px-24px](../../images/24px-24px.svg?raw=true "24px-24px")

### 2. Icons must have at least **1 pixel padding** within the canvas.

![1px-padding](../../images/1px-padding.svg?raw=true "1px-padding")

### 3. Icons must have a **stroke width of 2 pixels**.

![2px-stroke](../../images/2px-stroke.svg?raw=true "2px-stroke")

### 4. Icons must use **round joins**.

![round-joints](../../images/round-joints.svg?raw=true "round-joints")

### 5. Icons must use **round caps**.

![round-caps](../../images/round-caps.svg?raw=true "round-caps")

### 6. Icons must use **centered strokes**.

![centered-strokes](../../images/centered-strokes.svg?raw=true "centered-strokes")

### 7. Shapes (such as rectangles) must have a **border radius of**

#### A. **2 pixels** if they are at least 8 pixels in size

![2px-border-radius](../../images/2px-border-radius.svg?raw=true "2px-border-radius")

#### B. **1 pixel** if they are smaller than 8 pixels in size

![1px-border-radius](../../images/1px-border-radius.svg?raw=true "1px-border-radius")

### 8. Distinct elements must have **2 pixels of spacing between each other**

![2px-element-spacing](../../images/2px-element-spacing.svg?raw=true '2px-element-spacing')

![2px-element-spacing-connected](../../images/2px-element-spacing-connected.svg?raw=true '2px-element-spacing-connected')

![2px-element-spacing-abrupt-cut](../../images/2px-element-spacing-abrupt-cut.svg?raw=true '2px-element-spacing-abrupt-cut')

### 9. Icons should have a similar optical volume to `circle` and `square`.

![optical-volume-ideal](../../images/optical-volume-ideal.svg?raw=true "optical-volume-ideal")

![optical-volume-low](../../images/optical-volume-low.svg?raw=true "optical-volume-low")

![optical-volume-high](../../images/optical-volume-high.svg?raw=true "optical-volume-high")

**Tip:** place your icon next to the circle or square icon and blur them both; your icon should not feel much darker than the base shape.

### 10. Icons should be visually centered by their center of gravity.

![visually-centered](../../images/visually-centered.svg?raw=true "visually-centered")

![visually-centered-bad](../../images/visually-centered-bad.svg?raw=true "visually-centered-bad")

**Tip:** place your icon both above/below and next to the square or circle icon and check if it feels off center. Symmetrical icons should always be aligned to the center.

### 11. Icons should have similar visual density and level of detail.

![density-ideal](../../images/density-ideal.svg?raw=true "density-ideal")

![density-high](../../images/density-high.svg?raw=true "density-high")

**Tip:** try to make abstractions to dense elements. Blur your icon, and when blurred it should not feel overly dark.

### 12. Continuous curves should join smoothly.

![curvature-smooth](../../images/curvature-smooth.svg?raw=true "curvature-smooth")

![curvature-uneven](../../images/curvature-uneven.svg?raw=true "curvature-uneven")

**Tip:** make sure to use arcs or quadratic curves. When using cubic curves control points should have mirrored angles for smooth curves.

### 13. Icons should aim to be pixel perfect so that they will be sharp on low DPI displays.

![pixel-perfection-ideal](../../images/pixel-perfection-ideal.svg?raw=true "pixel-perfection-ideal")

![pixel-perfection-bad](../../images/pixel-perfection-bad.svg?raw=true "pixel-perfection-bad")

**Tip:** whenever possible align elements and arc centers to the grid.

## Naming conventions

1. Icon names use lower kebab case.\
   For example: `arrow-up` instead of `Arrow Up`.

2. Icon names use International English names, as opposed to local variants.\
   For example:  `color` instead of `colour`.

3. Icons should be named for what they depict rather than their use case or what they represent.\
   For example: `floppy-disk` instead of `save` and `circle-slash` rather than `ban`.

4. Icons that are part of a group are named `<group>-<variant>`.\
   For example: `badge-plus` is based on `badge`.

5. Icon names for alternate icons should represent what makes the alternate unique instead of being numbered.\
   For example: `send-horizontal` instead of `send-2`.

6. Names containing numerals are not allowed, unless the number itself is represented in the icon.\
   For example: `arrow-down-0-to-1` contains both numerals.

7. Icons depicting multiple elements (e.g. a person and a circle) of different sizes must list these elements in decreasing order of size.\
   For example: if the circle is bigger, it should be `circle-person`, if the person is bigger, it should be `person-circle`.

8. Icons depicting multiple elements of roughly equal sizes (e.g. a `ruler` and a `pencil`) must list these elements front to back in case one element is in front of the other, otherwise in English reading order (top to bottom, left to right).\
   For example: if the `pencil` is either in front of, above or left of `ruler`, it should be `pencil-ruler`, otherwise, it should be `ruler-pencil`.

9. Icons depicting some sort of variation of an element must use the `[element]-[modifier]` naming scheme, with modifiers being applied to each element respectively.\
   For example: a dashed circle must be named `circle-dashed`, not `dashed-circle`, and in coordination with the previous guidelines, a dashed circle containing a broken heart would be named `circle-dashed-heart-broken`, due to the heart being smaller than the circle.

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
We recommend to use [Lucide Studio](https://studio.lucide.dev/) to tidy paths to 3 points of precision.

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
