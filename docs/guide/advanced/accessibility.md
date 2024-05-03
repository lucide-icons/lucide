---
title: Accessibility
---

# Accessibility

Icons are pictures that show what something means without using words. They can be very helpful
because they can quickly give information.

However, not everyone can understand them easily. When using icons it is very important to consider
the following aspects of accessibility.

## Provide visible labels

Icons are a helpful tool to improve perception, but they aren't a replacement for text.

In most cases, it is probably a good idea to also provide a textual representation of your icon's
function.

![In short: Don’t rely on communicating the function of elements by icons alone. Do also provide a written description of the your interactive elements. For example: write out "On this page" on your on-page navigation element.](../../images/a11y/visible-labels.svg?raw=true)

## Contrast

Ensure there's enough contrast between the icon and its background so that it's visible to people
with low vision or color vision deficiencies.

We recommend
following [WCAG 2.1 SC 1.4.3](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html).

![In short: use a contrast ratio of at least 4.5:1](../../images/a11y/contrast.svg?raw=true)

## Use of color

Avoid relying solely on color to convey meaning in icons, as some users may have color blindness.
Instead, use additional visual cues like shape, shading or text.

![For example: Don’t mark state with color, mark it with distinct visuals.](../../images/a11y/use-of-color.svg?raw=true)

## Interactivity

Ensure that interactive icons are accessible via keyboard navigation and provide clear feedback when
activated.

![](../../images/a11y/interactivity.svg?raw=true)

In most cases this is easily done by wrapping them in icon buttons.

## Minimum target size

Small targets can be difficult to click or touch, if your icon is interactive, we recommend that it
should have a minimum target size of 44×44 pixels.

![](../../images/a11y/target-size.svg?raw=true)

In practice, this doesn't necessarily mean that the icon itself should be this large, only its
interactive wrapper element.

## Meaningfulness

Icons should represent concepts or actions in a universally understandable way. Avoid using abstract
or ambiguous, or culture-specific symbols that might confuse some users.

![For example: Don't base your choice of icon on puns.](../../images/a11y/meaningfulness.svg?raw=true)

## Consistency

Maintain consistency in icon design and usage across your interface to help users learn and
understand their meanings more easily.

![For example: Don’t use the same icon for multiple distinct purposes or meanings. Don’t use different icons for the same purpose or function.](../../images/a11y/consistency.svg?raw=true)

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
In case some of your icons stand alone, and they serve a non-decorative function, make sure to provide
the appropriate accessible label for them via the `aria-label` attribute.
:::

![](../../images/a11y/alttext-standalone.svg?raw=true)

In general try to avoid using functional icons with no interactivity, we recommend that:

1) you either add a visible description next to them, or
2) place them in badges, labels or on buttons, and at least add a tooltip to them.

In any such case, it is preferred that the accessible name be provided for these interactive
elements (badges, buttons, nav items etc.) only, _not_ the icons themselves.

### On buttons

Do not provide an accessible label to icons when used on a button, as this label will be read out by
screen readers, leading to nonsensical text.

![](../../images/a11y/alttext-buttons.svg?raw=true)

### On icon buttons

Icon buttons are buttons that do not contain any visible text apart from the icon itself (think of
the close button of a dialog for example).

![](../../images/a11y/alttext-iconbuttons.svg?raw=true)
