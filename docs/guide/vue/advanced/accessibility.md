---
head:
  - - link
    - rel: canonical
      href: https://lucide.dev/guide/react/advanced/accessibility
  - - meta
    - name: description
      content: Best practices for accessible icons in your application.
---

<script setup>
import OverviewLink from '~/.vitepress/theme/components/base/OverviewLink.vue'
</script>

# Accessibility

By default all lucide icons are applied with `aria-hidden="true"` which makes them **not** accessible for screen readers.
This is done because most of the time icons are used for decorative purposes only.

If you need to make an icon accessible, you can do so by passing a `title` element as a child or passing the `aria-label` prop to the icon component.
This will remove the `aria-hidden` attribute and make the icon accessible.

```tsx
<House>
  <title>This is my house</title>
</House>

// or

<House aria-label="This is my house" />
```

We recommend to describe the icon in a way that makes sense for the user, or the action it represents and that makes sense in the context of your application.

## Accessible Icon Buttons

When using icon buttons, you should not provide an accessible label on the icon itself, but rather on the button.

```tsx
<button aria-label="Go to home">
  <House />
</button>
```

## Detailed Guide on Accessibility

For best practices on how to use icons accessibly in your application, please refer to our detailed guide on accessibility.

<OverviewLink href="/guide/accessibility" title="Accessible Icons" desc="Best practices for accessible icons in your application."/>
