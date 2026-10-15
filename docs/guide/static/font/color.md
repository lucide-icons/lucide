---
title: Color the Lucide icon font
description: Learn how to customize the color of Lucide icons in your static projects using CSS. This guide covers how to change icon colors with CSS classes and inline styles for web font implementations.
---
# Color the font

Styling the Lucide icon font with CSS is straightforward. You can change the color of the icons using the `color` property in your CSS. This allows you to easily customize the appearance of the icons to match your design.

## Changing Icon Color

To change the color of the icons, simply apply the `color` property to the element that contains the icon. For example, if you want to change the color of an icon to red, you can use the following CSS:

```css
.icon-house {
  color: red;
}
```

This will change the color of the icon with the class `icon-house` to red. You can use any valid CSS color value, such as hex codes, RGB, or named colors.

## Inheriting Color from Parent Elements

By default, the icons will inherit the color from their parent elements. This means that if you set a color on a parent element, all child icons will automatically take on that color unless you override it with a specific color for the icon. The same as text elements in HTML, the icon font will use the `color` property to determine its color, allowing for easy styling and consistency across your project.
