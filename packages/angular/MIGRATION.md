# Migrating from `lucide-angular` ⇒ `@lucide/angular`

## What changed

`@lucide/angular` moves from a module + single component based API to a more modern Angular approach:

- The library defines modern signal-based, standalone components, without zone.js based change detection.
- Icons are consumed as standalone imports (one component per icon).
- Dynamic icon registration is done via `provideLucideIcon()`, not using `NgModule`.
- Static icons use per-icon components for better tree-shaking.
- Dynamic icons still use a single dynamic component (`svg[lucideIcon]`).
- Global defaults are configured via `provideLucideConfig()`.

---

## Step 1 – Update dependencies

Remove `lucide-angular`, add `@lucide/angular`, see http://lucide.dev/guide/packages/angular#installation

---

## Step 2 – Replace `LucideAngularModule.pick(...)` with `provideLucideIcons(...)`

> Notes:
> - Old imports like `AirVentIcon` / `AlarmClock` from `lucide-angular` should be replaced with the new per-icon exports `LucideAirVent` and `LucideAlarmClock`.
> - If you mostly used static icons, you may not need to provide them **at all**, please refer to Step 3.

### Before

#### NgModule based
```ts
import { LucideAngularModule, AirVent, AlarmClock } from 'lucide-angular';

@NgModule({
  imports: [
    BrowserModule,
    LucideAngularModule.pick({ AirVent, AlarmClock }),
  ],
})
export class AppModule {}
```

#### Standalone

```ts
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(LucideAngularModule.pick({ AirVent, AlarmClock })),
  ]
};
```

### After
```ts
import { ApplicationConfig } from '@angular/core';
import { provideLucideIcons, LucideAirVent, LucideAlarmClock } from '@lucide/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    provideLucideIcons([
      LucideAirVent,
      LucideAlarmClock,
    ]),
  ]
};
```

---

## Step 3 – Replace `<lucide-angular>` / `<lucide-icon>` / `<i-lucide>` / `<span-lucide>`

The legacy package rendered everything through a single component. All of these selectors must be migrated to `<svg>` usage.

### A. Static icons by name

If the icon is known at build time, just use a static import:

#### Before
```html
<lucide-angular name="circle-check"></lucide-angular>
```

#### After
```html
<svg lucideCircleCheck></svg>
```

### B. Static icons with icon data binding

#### Before
```ts
import { CircleCheck } from 'lucide-angular';
```

```html
<lucide-icon [img]="CircleCheck"></lucide-icon>
```

#### After

```ts
import { LucideCircleCheck } from '@lucide/angular';
```

```html
<svg lucideCircleCheck></svg>
```

...and import `LucideCircleCheck` from `@lucide/angular`.

---

### C. Dynamic icons

If the icon varies at runtime, use the dynamic component:

#### Before
```html
<lucide-icon [name]="item.icon"></lucide-icon>
```

#### After
```html
<svg [lucideIcon]="item.icon"></svg>
```

---

## Step 4 – Replace `LucideIconConfig` with `provideLucideConfig()`

### Before
```ts
import { inject } from '@angular/core';
import { LucideIconConfig } from 'lucide-angular';

inject(LucideIconConfig).size = 12;
```

### After
```ts
import { provideLucideConfig } from '@lucide/angular';

providers: [
  provideLucideConfig({ size: 12 }),
]
```

### Where to place it

- App-wide: `AppModule.providers` or `bootstrapApplication(...providers)`
- Feature-level: feature module providers
- Component-level (standalone): component `providers`

---

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

---

## TL;DR
- `LucideAngularModule` ⇒ static: removed; dynamic: `LucideIcon`
- `LucideAngularModule.pick(...)` ⇒ `provideLucideIcons(...)`
- `<lucide-angular name="foo-bar">` ⇒ `<svg lucideFooBar>`
- `<lucide-icon [name]="expr">` ⇒ `<svg [lucideIcon]="expr">`
- `<lucide-icon [img]="expr">` ⇒ `<svg [lucideIcon]="expr">`
- `LucideIconConfig` ⇒ `provideLucideConfig(...)`
