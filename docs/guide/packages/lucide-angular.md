# Lucide Angular

Angular components and services for Lucide icons that integrate with Angular's dependency injection and component system. Provides both traditional module-based and modern standalone component approaches for maximum flexibility in Angular applications.

**What you can accomplish:**
- Use icons as Angular components with full dependency injection support
- Configure icons globally through Angular services and providers
- Choose from multiple component selectors (lucide-angular, lucide-icon, i-lucide, span-lucide)
- Integrate with Angular's reactive forms and data binding
- Build scalable applications with tree-shaken icon bundles and lazy loading support

## Installation

::: code-group

```sh [pnpm]
pnpm add lucide-angular
```

```sh [yarn]
yarn add lucide-angular
```

```sh [npm]
npm install lucide-angular
```

```sh [bun]
bun add lucide-angular
```

:::

## How to use

### Step 1: Import `LucideAngularModule`

In any Angular module you wish to use Lucide icons in, you have to import `LucideAngularModule`, and pick any icons you wish to use:

```js
import { LucideAngularModule, File, House, Menu, UserCheck } from 'lucide-angular';

@NgModule({
  imports: [
    LucideAngularModule.pick({File, House, Menu, UserCheck})
  ]
})
export class AppModule { }
```

or using standalone version:

```js
import { Component } from '@angular/core';
import { LucideAngularModule, FileIcon } from 'lucide-angular';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [LucideAngularModule]
})
export class AppComponent {
  readonly FileIcon = FileIcon;
}
```
### Step 2: Use the icons in templates

Within your templates you may now use one of the following component tags to insert an icon:

```html
<lucide-angular name="file" class="my-icon"></lucide-angular>
<lucide-icon name="house" class="my-icon"></lucide-icon>
<i-lucide name="menu" class="my-icon"></i-lucide>
<span-lucide name="user-check" class="my-icon"></span-lucide>
```
for standalone
```html
<lucide-angular [img]="FileIcon" class="my-icon"></lucide-angular>
<lucide-icon [img]="FileIcon" class="my-icon"></lucide-icon>
<i-lucide [img]="FileIcon" class="my-icon"></i-lucide>
<span-lucide [img]="FileIcon" class="my-icon"></span-lucide>
```

### Props

You can pass additional props to adjust the icon appearance.

| name                  | type      | default      |
| --------------------- | --------- | ------------ |
| `size`                | *number*  | 24           |
| `color`               | *string*  | currentColor |
| `strokeWidth`         | *number*  | 2            |
| `absoluteStrokeWidth` | *boolean* | false        |

```html
<i-lucide name="house" [size]="48" color="red" [strokeWidth]="1"></i-lucide>
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

::: danger
You may also opt to import all icons if necessary using the following format but be aware that this will significantly increase your application build size.
:::

```js
import { icons } from 'lucide-angular';

...

LucideAngularModule.pick(icons)
```

## With Lucide lab or custom icons

[Lucide lab](https://github.com/lucide-icons/lucide-lab) is a collection of icons that are not part of the Lucide main library.
They can be used in the same way as the official icons.

```js
import { LucideAngularModule } from 'lucide-angular';
import { coconut } from '@lucide/lab';

@NgModule({
  imports: [
    LucideAngularModule.pick({ coconut })
  ]
})
export class AppModule { }
```
