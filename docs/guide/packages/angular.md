# `@lucide/angular`

::: warning
This documentation is for `@lucide/angular`.

To learn about our legacy package for Angular, please refer to [`lucide-angular`](./lucide-angular).
:::

A standalone, signal-based, zoneless implementation of Lucide icons for Angular.

**What you can accomplish:**
- Use icons as standalone Angular components with full dependency injection support
- Configure icons globally through modern Angular providers
- Integrate with Angular's reactive forms and data binding
- Build scalable applications with tree-shaken icons and lazy loading support

## Prerequisites

This package requires Angular 17+ and uses standalone components, signals, and zoneless change detection.

## Installation

::: code-group

```sh [pnpm]
pnpm add @lucide/angular
```

```sh [yarn]
yarn add @lucide/angular
```

```sh [npm]
npm install @lucide/angular
```

```sh [bun]
bun add @lucide/angular
```

:::

## How to use

### Standalone icons

Every icon can be imported as a ready-to-use standalone component:

```html
<svg lucideFileText></svg>
```

```ts{2,7}
import { Component } from '@angular/core';
import { LucideFileText } from '@lucide/angular';

@Component({
  selector: 'app-foobar',
  templateUrl: './foobar.html',
  imports: [LucideFileText],
})
export class Foobar { }
```

::: tip
Standalone icon components use the selector `svg[lucide{PascalCaseIconName}]`.

This ensures minimal bloating of the DOM and the ability to directly manipulate all attributes of the resulting SVG element.
:::

### Dynamic icon component

You may also use the dynamic `LucideIcon` component to dynamically render icons.

#### With tree-shaken imports

You may pass imported icons directly to the component:

```html{3}
@for (item of items) {
  <a navbarItem [routerLink]="item.routerLink">
    <svg [lucideIcon]="item.icon"></svg>
    {{ item.title }}
  </a>
}
```

```ts{2,8,14,19}
import { Component } from '@angular/core';
import { LucideIcon, LucideHouse, LucideUsersRound } from '@lucide/angular';
import { NavbarItem, NavbarItemModel } from './navbar-item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  imports: [LucideIcon, NavbarItem],
})
export class Navbar {
  readonly items: NavbarItemModel[] = [
    {
      title: 'Home',
      icon: LucideHouse,
      routerLink: [''],
    },
    {
      title: 'Users',
      icon: LucideUsersRound,
      routerLink: ['admin/users'],
    },
  ];
}
```

#### With icons provided via dependency injection

Alternatively, the component also accepts string inputs.

To use icons this way, first, you have to provide icons via `provideLucideIcons`:

:::code-group
```ts{7-10} [app.config.ts]
import { ApplicationConfig } from '@angular/core';
import { provideLucideIcons, LucideCircleCheck, LucideCircleX } from '@lucide/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    provideLucideIcons([
      LucideCircleCheck,
      LucideCircleX,
    ]),
  ]
};
```

```html [foobar.html]
<svg lucideIcon="circle-check"></svg>
```

```ts{7} [foobar.ts]
import { Component } from '@angular/core';
import { LucideIcon } from '@lucide/angular';

@Component({
  selector: 'app-foobar',
  templateUrl: './template-url',
  imports: [LucideIcon],
})
export class Foobar { }
```
:::

::: tip
For optimal bundle size, provide icons at the highest appropriate level in your application.

Providing all icons at the root level may increase your initial bundle size, while providing them at feature module level enables better code splitting.
:::

::: warning
While you may provide your icons at any level of the dependency injection tree, be aware that [Angular's DI system is hierarchical](https://angular.dev/guide/di/defining-dependency-providers#injector-hierarchy-in-angular): `LucideIcon` will only have access to the icons provided closest to it in the tree.
:::

## Accessible labels

You can use the `title` input property to set the [accessible name element](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/title) on the SVG:

```html
<svg lucideIcon="house" title="Go to dashboard"></svg>
```

This will result in the following output:

```html{2}
<svg class="lucide lucide-house" ...>
  <title>Go to dashboard</title>
  <!-- SVG paths -->
</svg>
```

## Props

You can pass additional props to adjust the icon appearance.

| name                  | type      | default      |
|-----------------------|-----------|--------------|
| `size`                | *number*  | 24           |
| `color`               | *string*  | currentColor |
| `strokeWidth`         | *number*  | 2            |
| `absoluteStrokeWidth` | *boolean* | false        |

```html
<svg lucideHouse size="48" color="red" strokeWidth="1"></svg>
```

## Global configuration

You can use `provideLucideConfig` to configure the default property values as defined above:

```ts{2,7-9}
import { ApplicationConfig } from '@angular/core';
import { provideLucideConfig } from '@lucide/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    provideLucideConfig({
      strokeWidth: 1.5
    }),
  ]
};
```

## Styling via CSS

Icons can also be styled by using custom CSS classes:

```html
<svg lucideHousePlus class="my-icon"></svg>
```

```css
svg.my-icon {
    width: 12px;
    height: 12px;
    stroke-width: 3;
}
```

## With Lucide lab or custom icons

[Lucide lab](https://github.com/lucide-icons/lucide-lab) is a collection of icons that are not part of the Lucide main library.

While they aren't provided as standalone components, they can be still be passed to the `LucideIcon` component the same way as official icons:

```html
<!-- Directly as LucideIconData: -->
<svg [lucideIcon]="CoconutIcon"></svg>

<!-- As a provided icon by name: -->
<svg lucideIcon="coconut"></svg>
```

```ts{2,6-7,11-12}
import { provideLucideIcons } from '@lucide/angular';
import { coconut } from '@lucide/lab';

@Component({
  templateUrl: './foobar.html',
  // For using by name via provider:
  providers: [provideLucideIcons({ coconut })],
  imports: [LucideIcon]
})
export class Foobar {
  // For passing directly as LucideIconData:
  readonly CoconutIcon = coconut;
}
```

## Troubleshooting

### The icon is not being displayed
If using per-icon-components:
1. Ensure that the icon component is being imported, if using per-icon-components
2. Check that the icon name matches exactly (case-sensitive)

If using the dynamic component:
1. Ensure the icon is provided via `provideLucideIcons()` if using string names
2. Verify the icon is imported from `@lucide/angular` and not the legacy package

### TypeScript errors?
Make sure you're importing from `@lucide/angular` and not `lucide-angular`.

### Icons render with wrong defaults
Ensure `provideLucideConfig()` is used at the right level.

## Migration guide
Migrating from `lucide-angular`? Read our [comprehensive migration guide](https://github.com/lucide-icons/lucide/blob/main/packages/angular/MIGRATION.md).
