---
description: Learn the visual principles that make Lucide icons consistent and recognizable.
---

# Lucide Design Language

Lucide is designed as a consistent icon set, not just a collection of individual icons. Every icon should feel like it belongs alongside the rest of the library.

This guide explains the visual principles behind Lucide icons and how to apply them when designing new icons.

For concrete requirements such as canvas size, stroke width, spacing, and corner radii, see the [Icon Design Specification](./specification).


## 1. Use a 24 × 24 pixel canvas

:::: example

Icons **must** be designed on a 24 × 24 pixel canvas.

::: do ../../images/24px-24px.svg?raw=true
Use a **24 × 24 pixel** canvas.
:::

::: dont ../../images/24px-24px-violation.svg?raw=true
Use a larger or smaller canvas, or one that's not square.
:::

::::


## 2. Keep 1 pixel of safe zone

:::: example

Icons **must** have at least 1 pixel of padding between their strokes and the edge of the canvas.

::: do ../../images/1px-padding.svg?raw=true
Keep at least **1 pixel of padding** around the icon.
:::

::: dont ../../images/0px-padding.svg?raw=true
Failing to keep this safe zone will result in trimmed visuals.
:::

::::

## 3. Use 2 pixel strokes

:::: example

Strokes **must** be 2 pixels wide.

::: do ../../images/2px-stroke.svg?raw=true
Use a **2 pixel stroke width**.
:::

::: dont ../../images/2px-stroke-violation.svg?raw=true
Avoid thicker or thinner strokes.
:::

::::


## 4. Use round line joins

:::: example

Strokes **must** use round line joins.

::: do ../../images/round-joints.svg?raw=true
Use **round line joins**.
:::

::: dont ../../images/round-joints-violation.svg?raw=true
You **must not** use **miter or bevel** line joins.
:::

::::

## 5. Use round line caps

:::: example

Open paths **must** use round line caps.

::: do ../../images/round-caps.svg?raw=true
Use **round line caps** on open paths.
:::

::: dont ../../images/round-caps-violation.svg?raw=true
You **must not** use **butt or square** line caps.
:::

::::

## 6. Use centered strokes

:::: example

Strokes **must** be centered on their paths.

::: do ../../images/centered-strokes.svg?raw=true
Keep strokes **centered** on their paths.
:::

::: dont ../../images/centered-strokes-violation.svg?raw=true
You **must not** use **inside or outside** strokes.
:::

::::

## 7. Use consistent corner radii

:::: example

Almost all sharp corners **should** be rounded:

::: do ../../images/border-radius-correct.svg?raw=true
Use rounded corners.
:::

::: dont ../../images/border-radius-violation.svg?raw=true
Avoid sharp corners.
:::

::::

:::: example

The corner radius depends on the size of the element and the angle. For 90° angles you should:

::: do ../../images/2px-border-radius.svg?raw=true
Use a **2 pixel corner radius** for shapes that are at least 8 pixels wide or tall.
:::

::: do ../../images/1px-border-radius.svg?raw=true
Use a **1 pixel corner radius** for shapes smaller than 8 pixels.
:::

::::

:::: example

But there are always exceptions to the rule.

::: do ../../images/border-radius-90deg.svg?raw=true
Diagonal lines meeting at a right angle are usually rounded to 2.41 pixels in order to be perfectly grid aligned.
:::

::: do ../../images/border-radius-arbitrary.svg?raw=true
Even very sharp corners should have a minor amount of rounding applied, but how much exactly will vary on the geometry of the icon.
:::

::::

:::: example

Again, _almost_ every sharp corner should be rounded, but there are exceptions to the rule.

::: do ../../images/border-radius-line-join.svg?raw=true
Keep corners sharp if multiple lines meet.
:::

::: dont ../../images/border-radius-line-join-violation.svg?raw=true
Make icons consistent at different scales by not rounding these corners.
:::

::::

## 8. Keep 2 pixels of gap

:::: example

Distinct elements **must** have at least 2 pixels of visual spacing between them.

::: do ../../images/2px-element-spacing.svg?raw=true
Keep **2 pixels of spacing** between distinct elements.
:::

::: dont ../../images/1px-element-spacing.svg?raw=true
Never use gaps smaller than **2 pixels** between distinct elements.
:::

::::

:::: example

This includes the inside of shapes, so most inner gaps **should** be at least 2 pixels wide.

::: do ../../images/2px-inner-spacing.svg?raw=true
Keep at least **2 pixels of spacing** inside shapes.
:::

::: dont ../../images/1px-inner-spacing.svg?raw=true
Avoid inner gaps smaller than **2 pixels**.
:::

::::

:::: example

You can visualize this by trying to place a 2 pixel wide circle within your shape.

::: do ../../images/2px-inner-gap.svg?raw=true
If a **2 pixel wide circle** fits inside the shape without overlapping, the gap is wide enough.
:::

::: dont ../../images/1px-inner-gap.svg?raw=true
If a **2 pixel wide circle** overlaps the shape, the inner gap should be wider.
:::

::::


:::: example

The 2 pixel spacing also applies when elements visually connect or intersect.

::: dont ../../images/2px-element-spacing-connected.svg?raw=true
Maintain 2 pixels of spacing where elements visually connect.
:::

::: dont ../../images/2px-element-spacing-abrupt-cut.svg?raw=true
Avoid abrupt cuts where one element meets another.
:::

::::

## 9. Aim for uniform volume

:::: example

Icons should have a similar visual weight when viewed alongside each other.

::: do ../../images/visual-weight-consistent.svg?raw=true
Match the visual weight of `circle` and `square`.
:::

::: dont ../../images/visual-weight-uneven.svg?raw=true
The second icon is **too large**, the fourth is **too small**.
:::

::::

::: tip

The amount and distribution of strokes affect how heavy an icon appears. An icon with many closely spaced elements can appear much heavier than a simpler icon, even when both use the same stroke width.

Place your icon next to `circle` or `square` and blur them. Your icon should not appear significantly lighter or darker than the reference icon.

:::

## 10. Balance icons visually

:::: example

Icons should appear centered and balanced within the canvas.

::: do ../../images/visually-centered-do.svg?raw=true
Keep your icons visually centered.
:::

::: dont ../../images/visually-centered-dont.svg?raw=true
The optical volume of this icon is offset to the top left.
:::

::::

:::: example
Symmetrical icons should remain geometrically centered.

::: do ../../images/visually-centered-symmetrical-do.svg?raw=true
:::

::: dont ../../images/visually-centered-symmetrical-dont.svg?raw=true
:::

::::


::: tip
Geometric centering does not always produce a visually centered icon. Asymmetrical shapes may need to be moved slightly to compensate for their visual center of gravity.

Compare your icon with `circle` or `square` both side by side and vertically. If it appears shifted in either direction, adjust its position.
:::

## 11. Keep density low

:::: example

Lucide icons should have a similar visual density and level of detail.

::: do ../../images/density-optimal.svg?raw=true
Simplify complex subjects, preserving the features that make them identifiable.
:::

::: dont ../../images/density-too-dense.svg?raw=true
Avoid adding unnecessary details that make the design dense.
:::

::::

::: tip

Dense areas and closely spaced strokes can also make an icon appear heavier than surrounding icons.

View the icon at its intended size and try blurring it. Areas that become noticeably dark may contain too much detail.

:::

## 12. Use smooth, simple curves


:::: example

Curves should be smooth and use the simplest geometry that accurately describes the shape.

::: do ../../images/curvature-smooth.svg?raw=true
Prefer simple arcs and quadratic curves where possible.
:::

::: dont ../../images/curvature-uneven.svg?raw=true
Avoid uneven or unnecessarily complex curves.
:::
::::

::: tip
When cubic Bézier curves are necessary, keep their control points aligned appropriately to avoid visible changes in curvature.

Avoid unnecessary control points. They make shapes harder to maintain and can introduce subtle irregularities.
:::

## 13. Design for the pixel grid

:::: example
Lucide icons should appear sharp and intentional at small sizes, including on low-density displays.
::: do ../../images/pixel-perfection-ideal.svg?raw=true
Align coordinates and the centers of arcs and other geometric elements to the pixel grid where possible.
:::
::: dont ../../images/pixel-perfection-bad.svg?raw=true
Avoid placing geometry off the pixel grid without a visual reason.
:::
::::

::: tip
Pixel alignment should support the overall appearance of the icon rather than come at the expense of recognizable shapes, smooth curves, or visual balance.
:::

## 14. Reuse established shapes

:::: example
When creating variant icons, preserve the geometry of the base icon unless the new concept requires a change.
::: do ../../images/established-shapes-base-do.svg?raw=true
Reuse existing base icons exactly as they appear.
:::
::: dont ../../images/established-shapes-base-dont.svg?raw=true
Avoid altering the **geometry, placement and orientation** of base shapes.
:::
::::

:::: example
Related icons should share the same shapes and visual patterns wherever possible.
::: do ../../images/established-shapes-sub-do.svg?raw=true
Reuse elements from existing icons without change.
:::
::: dont ../../images/established-shapes-sub-dont.svg?raw=true
Avoid creating new designs for existing elements.
:::
::::

:::: example
Common modifiers and elements should behave consistently across both icon sets and the library.
::: do ../../images/established-shapes-consistency-do.svg?raw=true
Maintain consistency between the placement and size of addons.
:::
::: dont ../../images/established-shapes-consistency-dont.svg?raw=true
Avoid using irregular placements and sizes compared to existing icons.
:::
::::

::: tip
Preserving the base shape also makes related icons work better when switching between them in an interface.

Consistency with an existing icon should not override the other principles of the design language. Adjust the shape when necessary to maintain visual weight, balance, clarity, or readability.
:::

## TL;DR

When designing a Lucide icon:

1. **Use a 24 × 24 pixel canvas** with at least **1 pixel of safe zone**.
2. **Use 2 pixel centered strokes** with **round caps and joins**.
3. **Round sharp corners** using consistent radii appropriate for their size and geometry.
4. **Keep at least 2 pixels of gap** between distinct elements and, where possible, inside shapes.
5. **Match the optical volume** of `circle` and `square`.
6. **Center icons visually**, accounting for their center of gravity.
7. **Keep visual density low** and remove unnecessary detail.
8. **Use smooth, simple curves** without unnecessary control points.
9. **Align geometry to the pixel grid** where possible.
10. **Reuse established shapes and geometry** from existing Lucide icons.

When these guidelines conflict, prioritize **clarity, visual balance, and consistency with the rest of Lucide**.
