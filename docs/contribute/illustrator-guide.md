---
title: Illustrator Template Guide
---

# Illustrator Template Guide

This Guide explains how to properly use the Adobe Illustrator Template for Lucide.

>Attention: Even though it is unlikely the template can be outdated or not 100% correct. Please check the Icon Design Guide before you start working with the template to ensure integrity with the Lucide icon pack.

## General Workflow

The Illustrator template is created following guidelines from the [Icon Design Guide](icon-design-guide.md).

**Workflow:**

1. Download and open the [Illustrator template](https://github.com/lucide-icons/lucide/blob/main/docs/public/templates/illustrator_template.ai).

2. You can now remove the content from the example logo layer ("Draw") and start creating.

3. Verify that you follow the [Icon Design Guidelines](icon-design-guide.md).

4. Before you export the file as an SVG make sure to check that you followed the guidelines and remove all unnecessary layers (especially "Padding" and "Grid").

5. Export the file with the export menu under: `Export > Export As..` then save the file as SVG. Select the following options in the SVG Options dialog:

![SVG export options in Illustrator](../images/illustrator-svg-options.png?raw=true "Setting Page Size")

After that, double check that the [code conventions and SVG global attributes](icon-design-guide.md#code-conventions) are correct.

7. Minify paths with [SVGOMG](https://jakearchibald.github.io/svgomg/).
