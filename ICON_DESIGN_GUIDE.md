# Icon Degin Guide

To design icons for this icon library we need to follow some guidelines to match all the icons in the same style.

## Summary of the rules we have

1. Each Icon is desined on a canvas of **24 by 24 pixels**.
2. Each Icon have **1 pixel padding** between icon and the canvas.
3. Each icon has a **stroke width of 2 pixels**.
4. Each icon has **round joins**.
5. Each icon has **round caps**.
6. Each icon has **centered strokes**.
7. Each icon containing squares has a **border radius of 2 pixels**.
8. Each icon **2 pixels of spacing between elements**.

## The Rules Visualized

### 1. **Each Icon is desined on a canvas of 24 by 24 pixels**

![24px-24px](https://user-images.githubusercontent.com/11825403/92972184-17c60280-f482-11ea-94a5-af5984dabf05.png)

### 2. **Each Icon have 1 pixel between icon and the canvas**

![1px-padding](https://user-images.githubusercontent.com/11825403/92972337-5e1b6180-f482-11ea-93a7-3f62d9c4fce6.png)

### 3. **Each icon has a stroke width of 2 pixels**

![2px-stroke](https://user-images.githubusercontent.com/11825403/92972381-74292200-f482-11ea-90c1-2f0f6bc7ec59.png)

### 4. **Each icon has round joins**

![round-joints](https://user-images.githubusercontent.com/11825403/92972514-ab97ce80-f482-11ea-92b8-87d547699479.png)

### 5. **Each icon has round caps**

![round-caps](https://user-images.githubusercontent.com/11825403/92972587-c1a58f00-f482-11ea-967f-17b93eeaf3d2.png)

### 6. **Each icon has centered strokes**

![centered-strokes](https://user-images.githubusercontent.com/11825403/92972667-e6016b80-f482-11ea-8c78-3175c4c37687.png)

### 7. **Each icon containing squares has a border radius of 2 pixels**

![2px-border-radius](https://user-images.githubusercontent.com/11825403/92972705-fc0f2c00-f482-11ea-8d5e-7605462832f3.png)

### 8. **Each icon 2 pixels of spaciong between elements**

![2px-spacing](https://user-images.githubusercontent.com/11825403/92972733-06c9c100-f483-11ea-8fbc-73e5270c79ee.png)

## Code Conventions

Before an icon is added to the library, we like to have readable and optimized svg code.

### Global Attributes

For each icon these attributes are applied.

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
