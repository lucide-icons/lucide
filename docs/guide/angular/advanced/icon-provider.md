---
title: Icon provider - Angular
description: Learn how to register icons globally using provideLucideIcons, including custom and legacy icons.
---

# Icon provider

You can use the `LucideDynamicIcon` component to render icons by name. To use an icon by name, you must first register it with `provideLucideIcons`.

Make sure you are well acquainted with [how dependency injection in Angular works](https://angular.dev/guide/di).

## Registering icons

Use `provideLucideIcons` in your application providers to register icons.

```ts [app.config.ts]
import { ApplicationConfig } from '@angular/core';
import { provideLucideIcons, LucideSquareCheck, LucideCircleAlert } from '@lucide/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideLucideIcons(
      LucideSquareCheck,
      LucideCircleAlert,
    ),
  ],
};
```

You can then reference the registered icons by name:

```html [app.html]
<svg lucideIcon="square-check"></svg>
<svg lucideIcon="circle-alert"></svg>
```

## How names are resolved

Each registered icon is stored by its icon name. For built-in Lucide icons, this is typically the kebab-case icon name.

For example, registering `LucideSquareCheck` makes it available as:

```html
<svg lucideIcon="square-check"></svg>
```

If an icon defines aliases, those aliases are also registered automatically.

## Registering custom icons

`provideLucideIcons` can also register custom icon data objects.

```ts [custom-icon.ts]
import { LucideIconData } from '@lucide/angular';

export const MyCustomIcon: LucideIconData = {
  name: 'my-custom-icon',
  node: [
    ['circle', { cx: 12, cy: 12, r: 8 }],
  ],
};
```

```ts [app.config.ts]
import { ApplicationConfig } from '@angular/core';
import { provideLucideIcons } from '@lucide/angular';
import { MyCustomIcon } from './custom-icon';

export const appConfig: ApplicationConfig = {
  providers: [
    provideLucideIcons(MyCustomIcon),
  ],
};
```

```html [app.html]
<svg lucideIcon="my-custom-icon"></svg>
```

## Using legacy icon nodes

If you have icons in the legacy node format, such as custom icons matching `lucide-angular` or `@lucide/lab`, you can convert them using `lucideLegacyIcon`.

```ts [app.config.ts]
import { ApplicationConfig } from '@angular/core';
import { provideLucideIcons, lucideLegacyIcon } from '@lucide/angular';
import { CirclePlayIcon } from 'lucide-angular';
import { burger } from '@lucide/lab';

export const appConfig: ApplicationConfig = {
  providers: [
    provideLucideIcons(
      lucideLegacyIcon('circle-play', CirclePlayIcon, ['play-circle']),
      lucideLegacyIcon('burger', burger, ['hamburger']),
    ),
  ],
};
```

You can then use both the primary name and any aliases:

```html [app.html]
<svg lucideIcon="circle-play"></svg>
<svg lucideIcon="play-circle"></svg>
<svg lucideIcon="burger"></svg>
<svg lucideIcon="hamburger"></svg>
```

## Converting a map of legacy icons

If you already have a map of legacy icon nodes, use `lucideLegacyIconMap` to convert them into icon data objects.

```ts [app.config.ts]
import { ApplicationConfig } from '@angular/core';
import { provideLucideIcons, lucideLegacyIconMap, Circle } from '@lucide/angular';
import { UserRoundX } from 'lucide-angular';
import { burger } from '@lucide/lab';

export const appConfig: ApplicationConfig = {
  providers: [
    provideLucideIcons(
      Circle,
      ...lucideLegacyIconMap({ UserRoundX, burger }),
    ),
  ],
};
```

This converts the object keys to kebab-case icon names:

- `UserRoundX` → `user-round-x`
- `burger` → `burger`

The original object key is also added as an alias, so both of these will work:

```html
<svg lucideIcon="UserRoundX"></svg>
<svg lucideIcon="user-round-x"></svg>
```
