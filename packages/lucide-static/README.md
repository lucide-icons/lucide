# Lucide Static

This package include the following lucide implementations:

- All svg files
- Javascript library containing strings of svgs.
- Icon fonts
- Svg sprite

> What is lucide? Read it [here](https://github.com/lucide-icons/lucide#what-is-lucide).

## Why this package?

This package is suitable for very specific use cases for example if you want to use icon fonts, svg sprites, normal svgs or Common.js Svg strings.

> It is not recommended to use this package for svg sprites or icon fonts for web pages/applications, for prototyping it is ok. We recommended to bundlers for web applications to make sure you only bundle the used icons from this icon library (Threeshaking). Otherwise it will load all the icons, making you webpage loading slower. Threeshaking is only available in the packages: '[lucide](../lucide), [lucide-react](../lucide-react), [lucide-vue](../lucide-vue), [lucide-vue-next](../lucide-vue-next), [lucide-angular](../lucide-angular), [lucide-preact](../lucide-preact)'

## Installation

## Package Managers

```sh
yarn add lucide-static

# or

npm install lucide-static
```

### CDN

``` html
<!-- Svg File -->
<img src="https://unpkg.com/lucide@latest/icons/home.svg">

<!-- Icon Font, not recommended for production! -->
<script src="https://unpkg.com/lucide@latest/font/Lucide.ttf"></script>

<!-- Icon Sprite, not recommended for production! -->
<img src="https://unpkg.com/lucide@latest/sprite.svg#home">
```

## Usage
### SVG Files

#### Svg file as image

To use it in for example html:

``` html
<!-- Svg File -->
<img src="~lucide/icons/home.svg">
```

``` css
.home-icon {
  background-image: url(~lucide/icons/home.svg)
}
```
Make sure you have the correct loaders to make this work. [url-loader](https://v4.webpack.js.org/loaders/url-loader/)

#### Svg file Inline

You can simply import each svg by targeting `lucide-static/icons/{icon-name}.svg`.
To use svgs in your project you can for example use a [svg loader](https://v4.webpack.js.org/loaders/svg-inline-loader/).

```js
import arrowRightIcon from 'lucide-static/icons/arrow-right'

// return string of a svg
```

### SVG Sprite

```html
<!-- Icon Sprite, not recommended for production! -->
<img src="https://unpkg.com/lucide@latest/sprite.svg#home">
```

``` css
.home-icon {
  background-image: url(https://unpkg.com/lucide@latest/sprite.svg#home)
}
```

### Icon Font

```css
@import("~lucide-static/font/Lucide.css")
```

```html
<div class="icon-home"></div>
```
