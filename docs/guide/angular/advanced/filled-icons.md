---
title: Filled Icons - Angular
description: Fills are officially not supported. However, all SVG properties are available on all icons. Fill can still be used and will work fine on certain icons.
---
# Filled Icons

Fills are officially not supported.
However, all SVG properties are available on all icons.
Fill can still be used and will work fine on certain icons.

Example with stars:

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
