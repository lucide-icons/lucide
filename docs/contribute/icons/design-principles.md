---
description: Learn the visual principles that make Lucide icons consistent and recognizable.
---

# Lucide design language

Lucide is a consistent icon set, not a collection of unrelated icons. Every icon should feel like it belongs with the rest of the library.

This guide explains the visual rules behind Lucide icons and how to use them when designing new icons.

For the full rule list, see the [icon design specification](./specification)

## 1. Use a 24 × 24-pixel canvas

Icons **must** be designed on a 24 × 24-pixel canvas.

:::: example
::: do ../../images/24px-24px.svg?raw=true
Use a **24 × 24 pixel** canvas.
:::
::: dont ../../images/24px-24px-violation.svg?raw=true
Don't use a canvas that is larger, smaller, or not square.
:::
::::

## 2. Keep a 1-pixel safe zone

Icons **must** have at least 1 pixel of padding between their strokes and the edge of the canvas.

:::: example
::: do ../../images/1px-padding.svg?raw=true
Keep at least **1 pixel of padding** around the icon.
:::
::: dont ../../images/1px-padding-violation.svg?raw=true
Don't place strokes at the edge of the canvas. They may get clipped.
:::
::::

## 3. Use 2-pixel strokes

Strokes **must** be 2 pixels wide.

:::: example
::: do ../../images/2px-stroke.svg?raw=true
Use a **2-pixel stroke width**.
:::
::: dont ../../images/2px-stroke-violation.svg?raw=true
Don't use **thicker or thinner** strokes, or **mix stroke widths**.
:::
::::

## 4. Use round line joins

Strokes **must** use round line joins.

:::: example
::: do ../../images/round-joints.svg?raw=true
Use **round line joins**.
:::
::: dont ../../images/round-joints-violation.svg?raw=true
Don't use **miter or bevel** line joins.
:::
::::

::: tip
Round joins do not replace corner rounding. Most sharp corners still need a radius.
:::

## 5. Use round line caps

Open paths **must** use round line caps.

:::: example
::: do ../../images/round-caps.svg?raw=true
Use **round line caps** on open paths.
:::
::: dont ../../images/round-caps-violation.svg?raw=true
Don't use **butt or square** line caps.
:::
::::

## 6. Use centered strokes

Strokes **must** be centered on their paths.

:::: example
::: do ../../images/centered-strokes.svg?raw=true
Keep strokes **centered** on their paths.
:::
::: dont ../../images/centered-strokes-violation.svg?raw=true
Don't use **inside or outside** strokes. They change how line joins look.
:::
::::

## 7. Use consistent corner radii

Almost every sharp corner **should** be rounded.

:::: example
::: do ../../images/border-radius-correct.svg?raw=true
Use **rounded corners**.
:::
::: dont ../../images/border-radius-violation.svg?raw=true
Don't use **sharp corners**.
:::
::::

Corner radius depends on the size of the element and the angle. For 90° angles:

:::: example
::: do ../../images/2px-border-radius.svg?raw=true
Use a **2-pixel corner radius** for shapes that are at least 8 pixels wide or tall.
:::
::: do ../../images/1px-border-radius.svg?raw=true
Use a **1-pixel corner radius** for shapes smaller than 8 pixels.
:::
::::

There are exceptions:

:::: example
::: do ../../images/border-radius-90deg.svg?raw=true
Diagonal lines that meet at a right angle usually need a **2.41 pixel** radius (1+√2) to stay aligned to the grid.
:::
::: do ../../images/border-radius-arbitrary.svg?raw=true
Even **very sharp corners** usually need a small amount of rounding. The exact amount depends on the shape.
:::
::::

Avoid rounding corners **where multiple lines meet**.

:::: example
::: do ../../images/border-radius-line-join.svg?raw=true
Keep corners sharp where multiple lines meet so the icon scales well.
:::
::: dont ../../images/border-radius-line-join-violation.svg?raw=true
Don't round corners where more than two lines meet. This can make the icon scale poorly.
:::
::::

## 8. Keep at least 2 pixels between elements

Distinct elements **must** have at least 2 pixels of visual spacing between them.

:::: example
::: do ../../images/2px-element-spacing.svg?raw=true
Keep **2 pixels of spacing** between distinct elements.
:::
::: dont ../../images/1px-element-spacing.svg?raw=true
Don't use gaps smaller than **2 pixels** between distinct elements.
:::
::::

This also applies inside shapes. Most inner gaps **should** be at least 2 pixels wide.

:::: example
::: do ../../images/2px-inner-spacing.svg?raw=true
Keep at least **2 pixels of spacing** inside shapes.
:::
::: dont ../../images/1px-inner-spacing.svg?raw=true
Don't use inner gaps smaller than **2 pixels**.
:::
::::

You can test this by placing a **2-pixel-wide circle** inside your shape.

:::: example
::: do ../../images/2px-inner-gap.svg?raw=true
If a 2-pixel-wide circle fits **without overlapping**, the gap is **wide enough**.
:::
::: dont ../../images/1px-inner-gap.svg?raw=true
If the circle **overlaps** the shape, the gap should be **wider**.
:::
::::

The 2 pixel spacing also applies when elements visually connect or intersect.

:::: example
::: dont ../../images/2px-element-spacing-connected.svg?raw=true
Don't connect elements without keeping **2 pixels of spacing**.
:::
::: dont ../../images/2px-element-spacing-abrupt-cut.svg?raw=true
Don't use **abrupt cuts** where one element meets another.
:::
::::

## 9. Aim for consistent visual weight

Icons should have a similar visual weight when viewed alongside each other.

:::: example

::: do ../../images/visual-weight-consistent.svg?raw=true
Match the visual weight of `circle` and `square`.
:::

::: dont ../../images/visual-weight-uneven.svg?raw=true
The first icon is **too large**. The last one is **too small**.
:::

::::

::: tip
The amount and placement of strokes affect how heavy an icon looks. An icon with many close strokes can look heavier than a simpler icon, even with the same stroke width.

Place your icon next to `circle` or `square`, then blur both icons. Your icon should not look much lighter or darker than the reference icon.
:::

## 10. Balance icons visually

Icons should look centered and balanced within the canvas.

:::: example
::: do ../../images/visually-centered-do.svg?raw=true
Keep your icons visually centered.
:::
::: dont ../../images/visually-centered-dont.svg?raw=true
This icon feels shifted toward the top left.
:::
::::

:::: example
::: do ../../images/visually-centered-symmetrical-do.svg?raw=true
Symmetrical icons should remain geometrically centered.
:::
::: dont ../../images/visually-centered-symmetrical-dont.svg?raw=true
Don't place symmetrical icons off-center for no good reason.
:::
::::

::: tip
Geometric centering does not always look centered. Asymmetrical shapes may need a small adjustment.

Compare your icon with `circle` or `square` side by side and stacked vertically. If it looks shifted, adjust it.
:::

## 11. Keep density low

Lucide icons should have a similar level of detail.

:::: example
::: do ../../images/density-optimal.svg?raw=true
Simplify complex subjects, but keep the features that make them recognizable.
:::
::: dont ../../images/density-too-dense.svg?raw=true
Don't add extra details that make the design feel crowded.
:::
::::

::: tip

Dense areas and close strokes can make an icon look heavier than nearby icons.

View the icon at its intended size and blur it. Areas that turn dark may have too much detail.

:::

## 12. Use smooth, simple curves

Curves should be smooth and as simple as the shape allows.

:::: example
::: do ../../images/curvature-smooth.svg?raw=true
Prefer **simple arcs** and **quadratic curves** where possible.
:::
::: dont ../../images/curvature-uneven.svg?raw=true
Don't use **uneven or unnecessarily complex** curves.
:::
::::

::: tip
When you need cubic Bézier curves, align their control points to avoid visible bumps.

Avoid extra control points. They make shapes harder to edit and can create small flaws.
:::

## 13. Design for the pixel grid

Lucide icons should look sharp at small sizes, including on low-density displays.

:::: example
::: do ../../images/pixel-perfection-ideal.svg?raw=true
Align coordinates, arc centers, and other geometric elements to the pixel grid when possible.
:::
::: dont ../../images/pixel-perfection-bad.svg?raw=true
Don't place geometry off the pixel grid without a visual reason.
:::
::::

:::: example
::: do ../../images/pixel-perfection-subelement-do.svg?raw=true
Also **align subelements** to the pixel grid.
:::
::: dont ../../images/pixel-perfection-subelement-dont.svg?raw=true
Don't place subelements off-grid. They may become blurry on low-density displays.
:::
::::

:::: example
::: do ../../images/pixel-perfection-diagonals-do.svg?raw=true
In general try to **align every diagonal line** to the pixel grid.
:::
::: dont ../../images/pixel-perfection-diagonals-dont.svg?raw=true
Avoid placing diagonal lines off-grid. They will appear blurry and optically wider on low-density displays.
:::
::::

::: tip
Pixel alignment should support the icon. Do not let it harm shape recognition, smooth curves, or visual balance.
:::

## 14. Reuse established shapes

When creating a variant, keep the base icon geometry unless the new idea needs a change.

:::: example
::: do ../../images/established-shapes-base-do.svg?raw=true
Reuse existing base icons **exactly as they appear**.
:::
::: dont ../../images/established-shapes-base-dont.svg?raw=true
Don't change the **geometry, placement, or orientation** of base shapes.
:::
::::

Related icons should share shapes and visual patterns when possible.

:::: example
::: do ../../images/established-shapes-sub-do.svg?raw=true
Reuse elements from existing icons **without change**.
:::
::: dont ../../images/established-shapes-sub-dont.svg?raw=true
Don't redesign **existing elements**.
:::
::::

Common modifiers and elements should look consistent across the library.

:::: example
::: do ../../images/established-shapes-consistency-do.svg?raw=true
Keep add-ons consistent in **placement and size**.
:::
::: dont ../../images/established-shapes-consistency-dont.svg?raw=true
Don't use **irregular placement or size** compared to existing icons.
:::
::::

::: tip
Preserving the base shape makes related icons work better when users switch between them.

Consistency with an existing icon should not override clarity, balance, or readability. Adjust the shape when needed.
:::

## Summary

When designing a Lucide icon:

1. **Use a 24 × 24 pixel canvas** with at least **1 pixel of safe zone**.
2. **Use 2 pixel centered strokes** with **round caps and joins**.
3. **Round sharp corners** using consistent radii appropriate for their size and geometry.
4. **Keep at least 2 pixels of spacing** between distinct elements and, where possible, inside shapes.
5. **Match the visual weight** of `circle` and `square`.
6. **Center icons visually**, accounting for visual weight.
7. **Keep visual density low** and remove unnecessary detail.
8. **Use smooth, simple curves** without unnecessary control points.
9. **Align geometry to the pixel grid** where possible.
10. **Reuse established shapes** from existing Lucide icons.

When these guidelines conflict, prioritize **clarity, visual balance, and consistency** with the rest of Lucide.
