---
name: New icon
about: Add a new icon to the library
labels: '🎨 <icon'
---

<!-- Thanks for submitting an icon! Please make sure you read the icon design guide
at https://github.com/lucide-icons/lucide/blob/main/docs/icon-design-guide.md beforehand,
and please fill everything below. -->

- **Name of the icon** : <!-- `icon` -->
- **Tags (alternative names for this icon)** (add them in as a separate json file using the same icon name) :
- **What is the purpose of this icon?** : <!-- Shows that one can click it to... / Is used to denote or label... -->
- **Have you considered alternative possibilities** for its naming or design? :

I have thought of everything:

- [ ] Elements have at least 1 pixel padding within the canvas.
- [ ] Icons are visually centered.
- [ ] Icons have a similar optical volume as `circle` and `square`.
- [ ] Icons have similar visual density and level of detail.
- [ ] Icons are fun and playful.
- [ ] Elements and Arcs centers align with the grid.
- [ ] Corners have a 2px radius or have a good reason for sharpness.
- [ ] Holes and gaps only become invisible with stroke widths of at least 4px.
- [ ] Gaps are closed, so they are 2px when possible.
- [ ] Curves join smoothly.

I have optimized everything:

- [ ] Arc path segments are used in place of curves when possible.
- [ ] `circle` and `rect` are used instead of `path` when possible.
- [ ] `path` is used instead of `polyline`, `line` and `polygon`.
- [ ] Paths only contain one move segment.
- [ ] Dots use `M{{x}} {{y}}h0.01`.
