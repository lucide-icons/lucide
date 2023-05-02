# Lucide Angular

Implementation of the lucide icon library for angular applications.

> What is lucide? Read it [here](https://github.com/lucide-icons/lucide#what-is-lucide).

## Installation

```bash
yarn add lucide-angular
```

or

```bash
npm install lucide-angular
```

## How to use

### Step 1: Import `LucideAngularModule`

In any Angular module you wish to use Lucide icons in, you have to import `LucideAngularModule`, and pick any icons you wish to use:

```js
import { LucideAngularModule, File, Home, Menu, UserCheck } from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({File, Home, Menu, UserCheck})
  ]
})
export class AppModule { }
```

### Step 2: Use the icons in templates

Within your templates you may now use one of the following component tags to insert an icon:

```html
<lucide-angular name="file" class="my-icon"></lucide-angular>
<lucide-icon name="home" class="my-icon"></lucide-icon>
<i-lucide name="menu" class="my-icon"></i-lucide>
<span-lucide name="user-check" class="my-icon"></span-lucide>
```

### Props

You can pass additional props to adjust the icon appearance.

| name               | type      | default      |
| ------------------ | --------- | ------------ |
| `size`             | _number_  | 24           |
| `color`            | _string_  | currentColor |
| `strokeWidth`      | _number_  | 2            |
| `absoluteStrokeWidth` | _boolean_ | true         |

```html
<i-lucide name="home" [size]="48" color="red" [strokeWidth]="1"></i-lucide>
```

### Global configuration

You can inject the `LucideIconConfig` service in your root component to globally configure the default property values as defined above.

### Styling using a custom CSS class

Any extra HTML attribute is ignored, but the `class` attribute
is passed onto the internal SVG image element and it can be used to style it:

```css
svg.my-icon {
    width: 12px;
    height: 12px;
    stroke-width: 3;
}
```

## Injecting multiple icon providers

You may provide additional icons using the `LUCIDE_ICONS` injection token,
which accepts multiple providers of the interface `LucideIconsProviderInterface`
with the utility class `LucideIconsProvider` available for easier usage:

```js
import { LUCIDE_ICONS, LucideIconProvider } from 'lucide-angular';
import { MyIcon } from './icons/my-icon';

const myIcons = {MyIcon};

@NgModule({
  providers: [
    {provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(myIcons)},
  ]
})
export class AppModule { }
```

To add custom icons, you will first need to convert them to an [svgson format](https://github.com/elrumordelaluz/svgson).

## Loading all icons

> :warning: You may also opt to import all icons if necessary using the following format but be aware that this will significantly increase your application build size.

```js
import { icons } from 'lucide-angular';

...

LucideAngularModule.pick(icons)
```
