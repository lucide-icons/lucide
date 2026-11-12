---
description: Rules Lucide icons must follow.
---

# Icon design specification

This page lists the rules Lucide icons must follow.

For examples and guidance, see the [Lucide design language](./design-principles).

## Requirement levels

These terms show how strictly each rule applies:

- **Must** and **must not** mark required rules.
- **Should** and **should not** mark rules that can flex when needed to make a better icon.

Any exception should be intentional and fit the [Lucide design language](./design-principles).

## Canvas

1. Icons **must** use a 24 × 24-pixel canvas.
2. The canvas **must** be square.
3. Icon strokes **must** remain at least 1 pixel from the edge of the canvas.

## Strokes

1. Strokes **must** be 2 pixels wide.
2. Strokes **must** use round line joins.
3. Open paths **must** use round line caps.
4. Strokes **must** be centered on their paths.

## Corners

1. Sharp corners **should** be rounded unless the geometry of the icon requires otherwise.
2. Elements at least 8 pixels wide or tall **should** use a 2-pixel corner radius for 90° corners.
3. Elements smaller than 8 pixels **should** use a 1-pixel corner radius for 90° corners.
4. Diagonal lines meeting at a 90° angle **should** use a radius that preserves pixel-grid alignment. This radius is typically approximately 2.41 pixels.
5. Acute corners **should** use an appropriate amount of rounding based on their geometry.
6. Corners where multiple lines meet **should** remain sharp when rounding would cause the icon to render inconsistently at different sizes.

## Spacing

1. Distinct elements **must** have at least 2 pixels of visual separation.
2. Gaps between distinct elements **must not** be smaller than 2 pixels.
3. Inner gaps **should** be at least 2 pixels wide.
4. Spacing **should** remain visually consistent where elements connect or intersect.
5. Elements **should not** terminate with an abrupt cut where another element visually continues or intersects them.

## Visual weight

1. Icons **should** have a visual weight similar to the `circle` and `square` icons.
2. Icons **should not** appear substantially larger, smaller, heavier, or lighter than comparable Lucide icons.

## Alignment and balance

1. Icons **should** be visually centered within the canvas.
2. Asymmetrical icons **may** be moved slightly off center so they look visually centered.
3. Symmetrical icons **should** be geometrically centered.

## Visual density

1. Icons **should** have a level of detail similar to other Lucide icons.
2. Details **should** be simplified when they cause an icon to appear substantially denser than comparable icons.
3. Details that are not necessary for recognition **should** be omitted.

## Curves

1. Continuous curves **should** have smooth curvature.
2. Curves **should not** contain unintended or abrupt changes in curvature.
3. Arcs and quadratic Bézier curves **should** be preferred where they can accurately represent the intended geometry.
4. Cubic Bézier curves **may** be used where necessary.
5. Control points of adjoining cubic Bézier curves **should** be aligned where required to maintain continuous curvature.
6. Curves **should not** contain unnecessary control points.

## Pixel alignment

1. Coordinates **should** align to the pixel grid where possible.
2. Centers of arcs and other geometric elements **should** align to the pixel grid where possible.
3. Off-grid geometry **may** be used when required for visual balance, recognizable geometry, or smooth curvature.
4. Pixel alignment **should not** take precedence over the visual quality of the icon.

## Shared geometry

1. Variants of an existing icon **should** preserve the geometry, placement, and orientation of the base icon.
2. Elements that already exist in other Lucide icons **should** reuse established geometry where applicable.
3. Related icons **should** use consistent representations of shared elements.
4. Common modifiers and add-ons **should** use consistent geometry, size, and placement across related icons.
5. Existing geometry **may** be modified when necessary to satisfy other Lucide design language rules.

## Priority of requirements

When two non-required rules conflict, choose visual clarity and consistency with the Lucide design language.

Rules marked **must** or **must not** can only be broken when the project defines an explicit exception.
