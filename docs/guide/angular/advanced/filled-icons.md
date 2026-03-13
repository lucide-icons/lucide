---
title: Filled Icons - Angular
description: Fills are not officially supported, but can still be applied using standard SVG attributes, this may in some cases produce acceptable results.
---
# Filled Icons

Fills are not officially supported by Lucide.

However, since the icons are standard SVG elements, SVG attributes such as `fill` can still be applied. Depending on the icon, this may produce acceptable results.

## Example with stars:

::: code-group

```html [app.html]
<div class="star-rating">
  <div class="stars">
    <svg lucideStar fill="#111" strokeWidth="0" />
    <svg lucideStar fill="#111" strokeWidth="0" />
    <svg lucideStar fill="#111" strokeWidth="0" />
    <svg lucideStar fill="#111" strokeWidth="0" />
    <svg lucideStar fill="#111" strokeWidth="0" />
  </div>
  <div class="stars rating">
    <svg lucideStar fill="yellow" strokeWidth="0" />
    <svg lucideStar fill="yellow" strokeWidth="0" />
    <svg lucideHalfStar fill="yellow" strokeWidth="0" />
  </div>
</div>
```

```css [app.css]
.star-rating {
  position: relative;
}

.stars {
  display: flex;
  gap: 4px;
}

.rating {
  position: absolute;
  top: 0;
}
```
:::
