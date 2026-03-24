---
title: Accessibility - React
description: Best practices for accessible icons in your React application.
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

Only if an icon **conveys essential meaning on its own** should it be made accessible. The sections below explain how to do that in React.

## Making an icon accessible

To expose an icon to assistive technologies, provide an accessible name by passing a `title` element as a child or passing the `aria-label` prop to the icon component.

This removes the `aria-hidden` attribute and makes the icon visible to screen readers.

```tsx
<House>
  <title>This is my house</title>
</House>

// or

<House aria-label="This is my house" />
```

Choose a label that clearly describes the meaning of the icon or the action it represents in the context of your application.

## Accessible icon buttons

When an icon is used inside a button, the accessible label should usually be applied to the button itself, and not the icon.

```tsx
<button aria-label="Go to home">
  <House />
</button>
```

This ensures assistive technologies describe the interactive element, rather than the decorative graphic inside it.
