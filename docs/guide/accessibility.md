---
title: Accessibility
description: Learn how to make your icons accessible to all users, including those with disabilities.
---

# Accessibility in dept

Icons are pictures that show what something means without using words. They can be very helpful
because they can quickly give information.

However, not everyone can understand them easily. When using icons it is very important to consider
the following aspects of accessibility.

::: info
By default, we hide icons from screen readers using `aria-hidden="true"`.
You can make them accessible yourself by following the guidelines below.
:::

## Provide visible labels

Icons are a helpful tool to improve perception, but they aren't a replacement for text.

In most cases, it is probably a good idea to also provide a textual representation of your icon's
function.

<!--@include: ../../docs/images/a11y/visible-labels.svg -->

## Contrast

Ensure there's enough contrast between the icon and its background so that it's visible to people
with low vision or color vision deficiencies.

We recommend
following [WCAG 2.1 SC 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html).

<!--@include: ../../docs/images/a11y/contrast.svg -->

## Use of color

Avoid relying solely on color to convey meaning in icons, as some users may have color blindness.
Instead, use additional visual cues like shape, shading or text.

<!--@include: ../../docs/images/a11y/use-of-color.svg -->

## Interactivity

Ensure that interactive icons are accessible via keyboard navigation and provide clear feedback when
activated.

<!--@include: ../../docs/images/a11y/interactivity.svg -->

In most cases this is easily done by wrapping them in icon buttons.

## Minimum target size

Small targets can be difficult to click or touch, if your icon is interactive, we recommend that it
should have a minimum target size of 44×44 pixels.

<!--@include: ../../docs/images/a11y/target-size.svg -->

In practice, this doesn't necessarily mean that the icon itself should be this large, only its
interactive wrapper element.

## Meaningfulness

Icons should represent concepts or actions in a universally understandable way. Avoid using abstract
or ambiguous, or culture-specific symbols that might confuse some users.

<!--@include: ../../docs/images/a11y/meaningfulness.svg -->

## Consistency

Maintain consistency in icon design and usage across your interface to help users learn and
understand their meanings more easily.

<!--@include: ../../docs/images/a11y/consistency.svg -->

## Text Alternatives

You may have to provide text labels or alternative text descriptions for icons, especially for
screen readers used by people with visual impairments.

However: descriptions should only be provided to standalone icons that aren't purely decorative, as
providing accessible names to non-functional elements only increases clutter when using screen
readers.

### On standalone icons

Icons are usually very unlikely to stand on their own with no semantically meaningful wrapper
element. In most cases they will be part of a badge, button (including icon buttons), navigation
item or other interactive UI element.

::: warning
In case some of your icons stand alone, and they serve a non-decorative function, make sure to
provide the appropriate accessible label for them.
:::

<!--@include: ../../docs/images/a11y/alttext-standalone.svg -->

In general try to avoid using functional icons with no interactivity, we recommend that:

1) you either add a visible description next to them, or
2) place them in badges, labels or on buttons, and at least add a tooltip to them.

In any such case, it is preferred that the accessible name be provided for these interactive
elements (badges, buttons, nav items etc.) only, _not_ the icons themselves.

### On buttons

Do not provide an accessible label to icons when used on a button, as this label will be read out by
screen readers, leading to nonsensical text.

<!--@include: ../../docs/images/a11y/alttext-buttons.svg -->


::: details Code examples

```tsx
// Don't do this
<button>
  <Plus aria-label="Plus icon"/>
  Add document
</button>

// Do this, just leave it
<button>
  <Plus/>
  Add document
</button>
```

:::

### On icon buttons

Icon buttons are buttons that do not contain any visible text apart from the icon itself (think of
the close button of a dialog for example).

As previously stated, you should provide your accessible label on the icon button itself, not the
contained icon.

<!--@include: ../../docs/images/a11y/alttext-iconbuttons.svg -->

::: details Code examples

```tsx
// Don't do this
<button class="btn-icon">
  <House/>
</button>

// Don't do this either
<button class="btn-icon">
  <House aria-label="Home icon"/>
</button>

// This works but might not be the best solution, see below
<button aria-label="Go to home" class="btn-icon">
  <House/>
</button>

// Do this instead
<button class="btn-icon">
  <House/>
  <span class="visually-hidden">Go to home</span>
</button>
```

:::

## A note on `aria-label`

Although you could provide accessible labels to your elements via the `aria-label` attribute, we
generally recommend avoiding this and instead suggest that you use your chosen CSS framework's "
visually hidden" utility whenever possible. You can
[read more about why `aria-label` might not be the best solution](https://gomakethings.com/revisting-aria-label-versus-a-visually-hidden-class/).

### Example - Radix UI

Use [Radix UI's built-in accessible icon utility component](https://www.radix-ui.com/primitives/docs/utilities/accessible-icon).

```tsx
import { ArrowRightIcon } from 'lucide-react';
import { AccessibleIcon } from '@radix-ui/react-accessible-icon';

<AccessibleIcon label="Next item">
  <ArrowRightIcon />
</AccessibleIcon>
```

### Example - Bootstrap

```html

<div>
  <i data-lucide="phone" aria-hidden="true"></i>
  <span class="visually-hidden">Phone number</span>
</div>
```

### Example - Tailwind CSS

```html

<div>
  <i data-lucide="phone" aria-hidden="true"></i>
  <span class="sr-only">Phone number</span>
</div>
```

If you're not sure, you may consider learning more
about [how to hide content.](https://www.a11yproject.com/posts/how-to-hide-content/)

## Further resources

We also recommend checking out the following resources about accessibility:

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
- [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)
- [Learn accessibility on web.dev](https://web.dev/learn/accessibility)
- [Inclusive Components](https://inclusive-components.design/)
- [A11yTalks](https://www.a11ytalks.com/)
- [A11y automation tracker](https://a11y-automation.dev/)
- [The A11Y Project](https://www.a11yproject.com/)

<style>
svg.a11y-example {
  max-width: calc(100% + 48px);
  margin: 0 -24px;
}
@media (min-width: 480px) {
  svg.a11y-example {
    margin: 0;
    max-width: 100%;
  }
}
</style>
