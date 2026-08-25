---
description: Learn how to create Lucide icons in Inkscape.
---

# Inkscape setup guide

This guide shows how to set up Inkscape for Lucide icons.

## Set up the canvas

Inkscape creates new documents with a default canvas size. Change it to `24 × 24` pixels:

1. Open the Document Properties dialog with `File > Document Properties`.
2. On the _Page Size_ tab, under _Custom Size_, set units to `px` and set width and height to `24`.
   ![Setting page size](../../images/page-size.png?raw=true 'Setting page size')
3. On the _Grid_ tab, select `Rectangular Grid` and click _New Grid_.
   ![Setting grid properties](../../images/grid-1.png?raw=true 'Setting grid properties')
4. Set grid units to `px`, then set `Spacing X` and `Spacing Y` to `1`.
   ![Setting grid properties](../../images/grid-2.png?raw=true 'Setting grid properties')
5. Close the Document Properties dialog.
6. To center the canvas in the viewport, select `View > Zoom > Drawing`.

## Set up paths

1. Create a path or shape.
2. With the path selected, press `Ctrl+Shift+F` to open the Stroke and Fill panel.
   ![Stroke style properties](../../images/strokes.png?raw=true 'Setting grid properties')
3. On the _Stroke Style_ tab:
   - Set stroke width to `2px`.
   - Select the rounded join type.
   - Select the rounded cap type.
4. For rectangles, select the rectangle and set `Rx` and `Ry` to `2px` in the toolbar.
   ![Rectangle radius properties](../../images/corner-radius.png?raw=true 'Rectangle radius properties')

## Save a file

1. When you are ready, click _Save As_ and choose _Optimized SVG_ as the file type.
   ![Save as](../../images/save-as.png?raw=true 'Save as')

## Optimize your icon

As a final step, optimize your SVG with [Lucide Studio](https://studio.lucide.dev/).
