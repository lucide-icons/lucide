---
title: Accessibility
description: Learn how to make your icons accessible to all users, including those with disabilities.
---

<script setup>
import {
  menu,
  pawPrint,
  shirt,
  umbrella,
  userRoundCog,
} from '~/.vitepress/data/iconNodes';
import LucideIcon from '~/.vitepress/theme/components/base/LucideIcon.vue';
</script>

# Accessibility in depth

Icons are pictures that convey meaning without using words.

They can help people scan an interface, recognize actions, and understand status quickly.

Not everyone understands icons easily. Use the following accessibility rules when you add icons to an interface.

::: tip
Lucide icons are hidden from screen readers by default with `aria-hidden="true"`.

Add accessible labels when icons carry meaning or act as controls.
:::

## Provide visible labels

Icons can improve scanning, but they aren't a replacement for text.

Text helps people understand actions and navigation more reliably than icons alone.

:::: example
::: do <span aria-hidden="true">On this page <LucideIcon name="menu" :iconNode="menu" /></span>
Provide a written description of your interactive elements.
:::
::: dont <LucideIcon name="menu" :iconNode="menu" />
Don't rely on icons alone to communicate what elements do.
:::
::::

## Provide enough contrast

Use enough contrast between an icon and its background. Low contrast makes icons harder to see for people with low vision or color vision deficiencies.

Follow [WCAG 2.1 SC 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) when contrast requirements apply.

:::: example
::: do ../images/a11y/contrast_do.svg?raw=true
Use a contrast ratio of at least 4.5:1.
:::
::: dont ../images/a11y/contrast_dont.svg?raw=true
Don't use low contrast.
:::
::::

## Do not rely on color alone

Use non-color cues like shape, shading, or text to mark state, status, and validity. Color can support meaning, but it must not be the only cue.

:::: example
::: do ../images/a11y/state_do.svg?raw=true
Mark state with non-color visual cues too.
:::
::: dont ../images/a11y/state_dont.svg?raw=true
Don't mark state only with color.
:::
::::

## Make interactive icons focusable

Wrap interactive icons in semantic elements. Icons that perform actions need keyboard access and clear feedback when activated.

:::: example
::: do ../images/a11y/interactive_icons_do.svg?raw=true
Wrap interactive icons in semantic elements, such as buttons, so they are focusable.
:::
::: dont ../images/a11y/interactive_icons_dont.svg?raw=true
Don't leave interactive icons unable to be focused.
:::
::::

## Use a large enough target size

Use a large enough target size for interactive icon controls. Small targets can be difficult to click or tap.

:::: example
::: do ../images/a11y/target_size_do.svg?raw=true
Keep the target size at a minimum of 44 by 44 pixels.
:::
::: dont ../images/a11y/target_size_dont.svg?raw=true
Don't make the target size smaller than 44 by 44 pixels.
:::
::::

The icon itself does not need to be 44 by 44 pixels. The interactive wrapper needs to meet the target size.

## Choose universal symbols when possible

Choose icons that are widely recognized for your use case. Avoid icons that only make sense to a narrow audience.

:::: example
::: do <span aria-hidden="true"><LucideIcon name="shirt" :iconNode="shirt" /> Clothing</span>
Pick icons that are universal symbols for your use case.
:::
::: dont <span aria-hidden="true"><LucideIcon name="umbrella" :iconNode="umbrella" /> Clothing</span>
Don't pick icons that are not universally recognizable for your use case.
:::
::::

## Avoid cultural or linguistic shortcuts

Choose icons with a clear connection to the concept. Puns, idioms, and culture-specific references can be difficult to understand or translate.

:::: example
::: do <span aria-hidden="true"><LucideIcon name="user-round-cog" :iconNode="userRoundCog" /> Role bearers</span>
Pick icons with a clear connection to the concept you want to represent.
:::
::: dont <span aria-hidden="true"><LucideIcon name="paw-print" :iconNode="pawPrint" /> Role bearers</span>
Don't pick icons based on puns or other cultural or linguistic cues.
:::
::::

## Use different icons for different meanings

Use different icons for different meanings. Reusing one icon for unrelated concepts makes the interface harder to learn.

:::: example
::: do ../images/a11y/distinct_use_case_do.svg?raw=true
Use different icons for distinct purposes or meanings.
:::
::: dont ../images/a11y/distinct_use_case_dont.svg?raw=true
Don't use the same icon for multiple distinct purposes or meanings, especially in the same context.
:::
::::

## Use the same icon for the same meaning

Use the same icon for the same meaning. Consistent icon use helps people recognize familiar actions across an interface.

:::: example
::: do ../images/a11y/same_use_case_do.svg?raw=true
Use the same icon for the same purpose or function.
:::
::: dont ../images/a11y/same_use_case_dont.svg?raw=true
Don't use different icons for the same purpose or function.
:::
::::

## Hide decorative icons from assistive technology

Keep decorative icons hidden from screen readers. Decorative icons repeat nearby text or add visual styling without adding meaning.

:::: example
::: do ../images/a11y/decorative_icons_do.svg?raw=true
Omit `aria-label` on decorative icons.
:::
::: dont ../images/a11y/decorative_icons_dont.svg?raw=true
Don't provide accessible labels to decorative icons.
:::
::::

## Label functional standalone icons carefully

Avoid standalone functional icons when possible. If an icon carries meaning without nearby text or an interactive wrapper, give that icon an accessible label.

:::: example
::: do ../images/a11y/functional_icons_do.svg?raw=true
Provide an accessible label for functional icons, but avoid standalone functional icons when possible.
:::
::: dont ../images/a11y/functional_icons_dont.svg?raw=true
Don't provide an accessible label for purely decorative icons.
:::
::::

In many cases, add visible text, place the icon inside a badge or button, or add a tooltip to the meaningful wrapper instead.

## Label icon buttons on the button

Give icon buttons an accessible name. Put the name on the button or in visually hidden text inside the button, not on the icon.

:::: example
::: do ../images/a11y/icon_button_do.svg?raw=true
Provide the accessible label for icon buttons themselves.
:::
::: dont ../images/a11y/icon_button_dont.svg?raw=true
Don't provide the accessible label for icons on icon buttons.
:::
::::

::: details Code examples

```tsx
// Don't do this
<button className="btn-icon">
  <House />
</button>

// Don't do this either
<button className="btn-icon">
  <House aria-label="Home icon" />
</button>

// This works, but visually hidden text is usually more reliable
<button aria-label="Go to home" className="btn-icon">
  <House />
</button>

// Prefer this
<button className="btn-icon">
  <House />
  <span className="visually-hidden">Go to home</span>
</button>
```

:::

## A note on `aria-label`

You can provide accessible labels with `aria-label`, but visually hidden text is often more reliable.

Read [why `aria-label` might not be the best solution](https://gomakethings.com/revisting-aria-label-versus-a-visually-hidden-class/) for more context.

### Radix UI

Use [Radix UI's built-in accessible icon utility component](https://www.radix-ui.com/primitives/docs/utilities/accessible-icon).

```tsx
import { ArrowRightIcon } from 'lucide-react';
import { AccessibleIcon } from '@radix-ui/react-accessible-icon';

<AccessibleIcon label="Next item">
  <ArrowRightIcon />
</AccessibleIcon>;
```

### Bootstrap

```html
<div>
  <i data-lucide="phone" aria-hidden="true"></i>
  <span class="visually-hidden">Phone number</span>
</div>
```

### Tailwind CSS

```html
<div>
  <i data-lucide="phone" aria-hidden="true"></i>
  <span class="sr-only">Phone number</span>
</div>
```

If you are not sure which hiding technique to use, read [how to hide content](https://www.a11yproject.com/posts/how-to-hide-content/).

## Further resources

Use these accessibility resources:

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
- [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)
- [Learn accessibility on web.dev](https://web.dev/learn/accessibility)
- [Inclusive Components](https://inclusive-components.design/)
- [A11yTalks](https://www.a11ytalks.com/)
- [A11y automation tracker](https://a11y-automation.dev/)
- [The A11Y Project](https://www.a11yproject.com/)
