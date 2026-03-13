---
title: Accessibility - Angular
description: Best practices for accessible icons in your Angular application.
---

<script setup>
import OverviewLink from '~/.vitepress/theme/components/base/OverviewLink.vue'
</script>

# Accessibility

Lucide icons ship with `aria-hidden="true"` by default. In almost all cases this is exactly what you want.

Icons are very often used purely for decoration or visual reinforcement, and exposing them to assistive technologies can create unnecessary noise for screen reader users. For a broader explanation of this approach and general guidance on accessible icon usage, please refer to the global accessibility guide first:

<OverviewLink href="/guide/accessibility" title="Accessible Icons" desc="Best practices for accessible icons in your application."/>

Only if an icon **conveys essential meaning on its own** should you make it accessible. The sections below explain how to do that in Angular.

## Making an Icon Accessible

To expose an icon to assistive technologies, you can provide an accessible name by binding to the `title` input of the icon component.
This will remove the `aria-hidden` attribute and the icon becomes visible to screen readers.

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

## Detailed Guide on Accessibility

For best practices on how to use icons accessibly in your application, please refer to our detailed guide on accessibility.

<OverviewLink href="/guide/accessibility" title="Accessible Icons" desc="Best practices for accessible icons in your application."/>
