---
title: Icon Design Guide
---

# Inkscape Setup Guide

This guide shows the steps to setup Inkscape for creating icons that conform to the Featherity design
guidelines.

## Setting up The Canvas

When opening a new document, Inkscape will create a canvas of a default size.  To change the size to 24x24:

1. Open the Document Properties dialog (File -> Document Properties).
2. On the “Page Size” tab, under “Custom Size” set the Units to `px` and set both Height and Width to 24.
![Setting Page Size](../../images/page-size.png?raw=true "Setting Page Size")
3. On the “Grid” tab, select `Rectangular Grid` and click “New Grid”.
![Setting Grid Properties](../../images/grid-1.png?raw=true "Setting Grid Properties")
4. Set the Grid Units to `px` and set Spacing X and Spacing Y both to 1.
![Setting Grid Properties](../../images/grid-2.png?raw=true "Setting Grid Properties")
5. Close the Document Properties dialog.
6. To center the canvas in the viewport, select View -> Zoom -> Drawing.

## Setting up The Paths

1. Create a path or shape.
2. With the path selected, open the Stroke and Fill panel by pressing `Ctrl+Shift+F` on your keyboard.
![Stroke Style Properties](../../images/strokes.png?raw=true "Setting Grid Properties")
3. On the “Stroke Style” tab:
   * Set Stroke Width to `2px`.
   * Select the rounded join type.
   * Select the rounded cap type.
4. If the shape is a rectangle, select the rectangle and in the top of the screen below the menu bar, set `Rx` and `Ry` to `2px`.
![Rectangle Radius Properties](../../images/corner-radius.png?raw=true "Rectangle Radius Properties")

## Saving A File

1. When ready to save the file, click Save As and select “Optimized SVG” as the file type.
![Save As](../../images/save-as.png?raw=true "Save as")
2. After clicking Save, to conform with the other icons in the package, set Pretty Printing to use spaces and set the indentation depth to 2.
![Optimize](../../images/optimize-settings.png?raw=true "Optimize")
