---
title: Version 1 🚀
description: After years of work and dedication, Lucide version 1 has been officially released! This milestone marks a significant achievement in our journey to provide a comprehensive and versatile icon library for developers and designers alike.
---
<!--@include: ../../docs/images/version-1.svg -->

# Lucide version 1

:::warning
STILL WORK IN PROGRESS, some guides and docs are not finished yet.
:::

After years of work and dedication, Lucide version 1 has been officially **released**! This milestone marks a significant achievement in our journey to provide a comprehensive and versatile icon library for developers and designers alike.

It's been crazy especially the last year, Lucide went over 20 million downloads per week and is used by million of projects worldwide. This release is a testament to the hard work of our community and contributors who have helped shape Lucide into what it is today.

Thank you to everyone who has supported us along the way. We couldn't have done it without you!

## What's New in Version 1? TLDR;

- Removed brand icons, see our [brand logo statement](/brand-logo-statement) for more details.
- Improved documentation, guides per framework.
- Improved accessibility, `aria-hidden` is now set by default on icons.
- Removed UMD build, only ESM and CJS now. (Exception for `lucide` package).
- Package rename from `lucide-vue-next` to `@lucide/vue`.
- Support for context providers in React, Vue, Svelte, and Solid.
<!-- - Aliases icon names in class names. -->
- Stable code points for Lucide font.
- Support for shadow DOM in Lucide package.
- Many bug fixes and improvements.

## Upgrading to Version 1

See our guides:

- guide for [Vanilla JavaScript](/guide/static/index)
- guide for [React](/guide/react/getting-started)
- guide for [Vue](/guide/vue/getting-started)
- guide for [Svelte](/guide/svelte/getting-started)
- guide for [Solid](/guide/solid/getting-started)
<!-- - guide for [Angular](/guide/angular/getting-started) -->
- guide for [Preact](/guide/preact/getting-started)
<!-- - guide for [Astro](/guide/astro/getting-started)
- guide for [Static](/guide/static/getting-started) -->

## Removed All Brand Icons

As part of our commitment to maintaining a sustainable and legally compliant icon library, we have made the decision to remove all brand icons from Lucide version 1. This change is in response to increasing legal pressures and the complexities associated with trademarked brand icons. See our [brand logo statement](/brand-logo-statement) for more details.

We understand that brand icons are important to many of our users, and we want to assure you that this decision was not made lightly. Our primary goal is to ensure that Lucide remains a reliable and legally sound resource for the community.

For users who still require brand icons, we recommend [Simple Icons](https://simpleicons.org/), which provides an extensive, legally safer collection of brand logos.

## Improved documentation, guides per framework.

We have revamped our documentation to provide clearer, more comprehensive guides tailored to each supported framework. Whether you're using React, Vue, Svelte, Solid, Angular, Astro or Vanilla JavaScript, you'll find: step-by-step instructions, code example and best practices to help you integrate Lucide seamlessly into your projects.

## Improved accessibility.

We have improved the accessibility of our icons by setting `aria-hidden` to `true` by default. This change ensures that screen readers will ignore icons that are purely decorative, improving the overall accessibility of your applications. If you need to make an icon accessible, you can provide an appropriate `aria-label` or add a `title` attribute to the icon element.

See our [accessibility in-depth guide](/guide/accessibility) for more details and best practices on making your icons accessible.

## Removed UMD build, only ESM and CJS now.

To streamline our build process and focus on modern JavaScript module formats, we have removed the UMD build from Lucide version 1. We now only support ESM (ECMAScript Modules) and CJS (CommonJS) formats. This is a reduction of -32.3% reduction (11,4 MB, 1 MB Gzipped) for `lucide-react`, with more than 25 million weekly downloads, this is a huge saving for the ecosystem.

## Package rename from `lucide-vue-next` to `@lucide/vue`.

`lucide-vue-next` is now renamed to `@lucide/vue` to get rid of the "next" suffix, which was only meant to indicate that it was the next version of the Vue package. This change is part of our effort to simplify our package naming and make it more consistent across all frameworks.

## Support for context providers

We have added support for context providers in React, Vue, Svelte, and Solid. This allows you to set default properties for all icons within a specific context, making it easier to manage icon styles and behavior across your application.

We always recommended to use CSS, but with this was not possible to set properties like `size` or `color` on specific icons, since CSS is always overriding this. With this new feature, you can now easily set default properties for all icons within a specific context, without having to manually set them on each icon.

::: code-group

```tsx [React]
import { LucideProvider, Home } from 'lucide-react';

const App = () => (
  <LucideProvider
    color="red"
    size={48}
    strokeWidth={2}
  >
    <Home />
  </LucideProvider>
);
```

```ts [Vue]
import { setLucideProps } from '@lucide/vue';

setLucideProps({
  size: 32,
  color: '#4f46e5',
  strokeWidth: 1.5,
});
```

```ts [Svelte]
import { setLucideProps } from '@lucide/svelte';

setLucideProps({
  size: 32,
  color: '#4f46e5',
  strokeWidth: 1.5,
});
```

```tsx [Solid]
import { LucideProvider, Home } from 'lucide-solid';

const App = () => (
  <LucideProvider
    color="red"
    size={48}
    strokeWidth={2}
  >
    <Home />
  </LucideProvider>
);
```

```ts [Angular]
import { ApplicationConfig } from '@angular/core';
import { provideLucideConfig } from '@lucide/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideLucideConfig({
      size: 32,
      color: '#4f46e5',
      strokeWidth: 1.5,
    }),
  ]
};
```

```tsx [Preact]
import { LucideProvider, Home } from 'lucide-preact';

const App = () => (
  <LucideProvider
    color="red"
    size={48}
    strokeWidth={2}
  >
    <Home />
  </LucideProvider>
);
```

```tsx [React Native]
import { LucideProvider, Home } from 'lucide-react-native';

const App = () => (
  <LucideProvider
    color="red"
    size={48}
    strokeWidth={2}
  >
    <Home />
  </LucideProvider>
);
```

:::

## Stable code points for Lucide font.

We have assigned stable code points for the Lucide font, each icon has a fixed code point that will not change in future releases. This ensures that if you are using the Lucide font in your projects, you can rely on the code points to remain consistent, even as we continue to add new icons and make improvements to the library.

## Support for shadow DOM in Lucide package.

Lucide package supports shadow DOM, allowing you to use Lucide icons in web components and other contexts where shadow DOM is used. This ensures that your icons will render correctly and maintain their styles, even when used within a shadow DOM.
