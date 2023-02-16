---
title: Icon Design Guide
---

# Icon Design Principles

Here are rules that should be followed to keep quality and consistency when making icons for Lucide.

## Summary of the rules we have

1. Icons must be designed on a **24 by 24 pixels** canvas.
2. Icons must have at least **1 pixel padding** within the canvas.
3. Icons must have a **stroke width of 2 pixels**.
4. Icons must use **round joins**.
5. Icons must use **round caps**.
6. Icons must use **centered strokes**.
7. Shapes (such as rectangles) in icons must have **border radius of 2 pixels**.
8. Distinct elements must have **2 pixels of spacing between each other**.

## The Rules Visualized

### 1. Icons must be designed on a 24 by 24 pixels canvas.

![24px-24px](images/24px-24px.png?raw=true "24px-24px")

### 2. Icons must have at least 1 pixel padding within the canvas.

![1px-padding](images/1px-padding.png?raw=true "1px-padding")

### 3. Icons must have a stroke width of 2 pixels.

![2px-stroke](images/2px-stroke.png?raw=true "2px-stroke")

### 4. Icons must use round joins.

![round-joints](images/round-joints.png?raw=true "round-joints")

### 5. Icons must use round caps.

![round-caps](images/round-caps.png?raw=true "round-caps")

### 6. Icons must use centered strokes.

![centered-strokes](images/centered-strokes.png?raw=true "centered-strokes")

### 7. Shapes (such as squares) in icons must have border radius of 2 pixels.

![2px-border-radius](images/2px-border-radius.png?raw=true "2px-border-radius")

### 8. Distinct elements must have 2 pixels of spacing between each other.

![2px-element-spacing](images/2px-element-spacing.png?raw=true "2px-element-spacing")

## Code Conventions

Before an icon is added to the library, we like to have readable and optimized svg code.

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

Code of paths can get really big.
To reduce file size we like to minify the code.
We recommend to use the [SVGOMG](https://jakearchibald.github.io/svgomg/) to minify paths.

### JSON metadata descriptor

Each icon added must also come with a matching JSON file listing tags and categories for the icon.
Please use the following template:

```json
{
  "$schema": "../icon.schema.json",
  "tags": [
    "foo",
    "bar"
  ],
  "categories": [
    "devices"
  ]
}
```
