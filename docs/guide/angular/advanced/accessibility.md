---
title: Accessibility - Angular
description: Best practices for accessible icons in your Angular application.
---

<script setup>
import OverviewLink from '~/.vitepress/theme/components/base/OverviewLink.vue'
</script>

# Accessibility

Lucide icons ship with `aria-hidden="true"` by default. In almost all cases this is exactly what you want.

## Should icons be accessible?

Most of the time, icons are used purely for decoration or visual reinforcement. Exposing decorative icons to assistive technologies can create unnecessary noise for screen reader users.

For a broader explanation of this, and other best practices on how to use icons accessibly in your application, please refer to our detailed guide on accessibility:

<OverviewLink href="/guide/accessibility" title="Accessible Icons" desc="Best practices for accessible icons in your application."/>

Only if an icon **conveys essential meaning on its own** should it be made accessible. The sections below explain how to do that in Angular.

## Making an Icon Accessible

To expose an icon to assistive technologies, provide an accessible name by binding the `title` input of the icon component.

This removes the `aria-hidden` attribute and makes the icon visible to screen readers.

```angular-html
<svg lucideHouse title="This is my house" />
```

Choose a label that clearly describes the meaning of the icon or the action it represents in the context of your application.

## Accessible Icon Buttons

When an icon is used inside a button, the accessible label should usually be applied to the button itself, and not the icon.

```angular-html
<button aria-label="Go to home">
  <svg lucideHouse></svg>
</button>
```

This ensures assistive technologies describe the interactive element, rather than the decorative graphic inside it.
