---
description: Learn how to choose clear and consistent names for Lucide icons.
---

<script setup>
import {
  arrowDown01,
  badgeCheck,
  badgePlus,
  ban,
  boneFracture,
  circleDashed,
  circleFadingArrowUp,
  circleUser,
  clock3,
  heartCrack,
  moonStar,
  notepadTextDashed,
  pencilRuler,
  rulerDimensionLine,
  save,
  sendHorizontal,
  squareDashed,
  sunSnow,
  userRound,
} from '~/.vitepress/data/iconNodes';
import LucideIcon from '~/.vitepress/theme/components/base/LucideIcon.vue';
const pencilRulerHorizontal = [
  ["path",{"d":"M10 16v-3","key":"1sz6hv"}],
  ["path",{"d":"M14 16v-3","key":"1rh0ni"}],
  ["path",{"d":"M16 2.999v5.98","key":"q5wnuh"}],
  ["path",{"d":"M18 16v-3","key":"gc63g1"}],
  ["path",{"d":"M19.005 2.994A3 3 0 0122 5.984a3 3 0 01-2.986 2.99l-11.777.017a2 2 0 01-.943-.25l-4.03-2.274a.5.5 0 010-.934l4.03-2.274a2 2 0 01.944-.247z","key":"1bk0ej"}],
  ["path",{"d":"M6 16v-3","key":"h6yyjy"}],
  ["rect",{"x":"2","y":"13","width":"20","height":"8","rx":"2","key":"ct2kk9"}]
];
const pencilRulerVertical = [
  ["path",{"d":"M16 10h-3","key":"4p2xpj"}],
  ["path",{"d":"M16 14h-3","key":"1xsqil"}],
  ["path",{"d":"M16 18h-3","key":"12gup7"}],
  ["path",{"d":"M16 6h-3","key":"1o5sfa"}],
  ["path",{"d":"M2.995 19.005a1 1 0 105.98.01L8.99 7.236a2 2 0 00-.25-.943l-2.274-4.03a.5.5 0 00-.934 0L3.26 6.294a2 2 0 00-.248.944z","key":"rw57er"}],
  ["path",{"d":"M3 16h5.979","key":"kkz6vb"}],
  ["rect",{"x":"13","y":"2","width":"8","height":"20","rx":"2","key":"qzgro9"}]
];
</script>

# Naming conventions

Learn how to choose clear, consistent names for Lucide icons.

This page covers word order, modifiers, variants, related icons, and other rules that keep icon names predictable.

Use this when naming a new icon or reviewing a proposed name.

## 1. Use lowercase kebab-case

Icon names **must** use lowercase kebab-case.

:::: example
::: do `arrow-up-0-1`
Use lowercase kebab-case.
:::
::: dont `Arrow Up 0-1` or `arrowUp01`
Avoid other naming schemes.
:::
::::

## 2. Use American English

Icon names **must** use American English, not local variants.

:::: example
::: do <span>`color`, `maximize`, `center`</span>
:::
::: dont <span>`colour`, `maximise`, `centre`</span>
:::
::::

## 3. Name icons for what they depict

Icon names **must** describe what the icon shows, not how someone might use it.

:::: example
::: do <LucideIcon :iconNode="save" /> `floppy-disk`
The icon **shows** a floppy disk.
:::
::: dont <LucideIcon :iconNode="save" /> `save`
Save is a use case.
:::
::::

:::: example
::: do <LucideIcon :iconNode="ban" /> `circle-slash`
The icon **shows** a circle with a slash across it.
:::
::: dont <LucideIcon :iconNode="ban" /> `ban`
Ban is an action.
:::
::::

::: tip
An icon can mean different things in different products. Naming icons by appearance keeps names clear and independent from use cases.
:::

## 4. Name related icons consistently

Icons that belong to the same group **must** use the `<group>-<variant>` naming scheme.

The group name comes first. The variant comes after it.

:::: example
::: do <span><LucideIcon :iconNode="badgePlus" /> + <LucideIcon :iconNode="badgeCheck" /></span> <span>`badge-plus` & `badge-check`</span>
`badge` is the group.
:::
::: dont <span><LucideIcon :iconNode="badgePlus" /> + <LucideIcon :iconNode="badgeCheck" /></span> <span>`plus-badge` & `check-badge`</span>
`plus` and `check` are not the group.
:::
::::

## 5. Describe alternate icons

Alternate versions of an icon **must** be named for what makes them visually different. Do **not** use numbers just to separate one version from another.

:::: example
::: do <LucideIcon :iconNode="sendHorizontal" /> `send-horizontal`
The icon depicts a horizontal "send" symbol.
:::
::: dont <LucideIcon :iconNode="sendHorizontal" /> <span>`send-2` or `send-alt`</span>
"send number 2" and "alternative send" are not clear names.
:::
::::

## 6. Only use numerals when depicted

Icon names **must not** include numbers unless the icon shows the number.

:::: example
::: do <LucideIcon :iconNode="arrowDown01" /> `arrow-down-0-1`
The arrow points from 0 to 1.
:::
::: dont <LucideIcon :iconNode="sendHorizontal" /> `send-2`
The icon does not show the number 2.
:::
::::

:::: example
::: do <LucideIcon :iconNode="clock3" /> `clock-3`
The hands point to 3 o'clock.
:::
::: dont <LucideIcon :iconNode="userRound" /> `user-3`
The icon does not show the number 3.
:::
::::

Do not use numbers to separate similar icons.

## 7. Order elements by size

When an icon shows multiple elements of different sizes, order their names from largest to smallest.

For an icon containing a circle and a person:

:::: example
::: do <LucideIcon :iconNode="moonStar" /> `moon-star`
The `moon` is larger than the `star`.
:::
::: dont <LucideIcon :iconNode="circleUser" /> `person-circle`
The `person` is **not** larger than the `circle`.
:::
::::

## 8. Order equally sized elements by position

When an icon depicts multiple elements of roughly equal size, their names **must** be ordered according to their visual position.

If elements overlap, name them from front to back.

If they do not overlap, name them in English reading order: top to bottom, then left to right.

:::: example
::: do <LucideIcon :iconNode="pencilRuler" /> `pencil-ruler`
The `pencil` is **in front** of the `ruler`, so it comes first.
:::
::: do <LucideIcon :iconNode="rulerDimensionLine" /> `ruler-dimension-line`
The ruler is below the dimension line, but it is **larger**, so it comes first.
:::
::::

:::: example
::: do <LucideIcon :iconNode="sunSnow" /> `sun-snow`
The `sun` is **left of** the `snowflake`, so it comes first.
:::
::: dont <LucideIcon :iconNode="pencilRulerHorizontal" /> `ruler-pencil`
The `ruler` is **below** the `pencil`, so `pencil-ruler` is the correct name.
:::
::::

## 9. Place modifiers after the element they describe

Modifiers **must** come after the element they describe: `<element>-<modifier>`.

:::: example
::: do <LucideIcon :iconNode="heartCrack" /> `heart-broken`
The icon shows a heart that is **cracked**.
:::
::: dont <LucideIcon :iconNode="boneFracture" /> `broken-bone`
The icon shows a bone that is **broken**, so name it `bone-broken`.
:::
::::

When an icon has multiple modified elements, each modifier **must** follow the element it describes.

:::: example
::: do <LucideIcon :iconNode="circleFadingArrowUp" /> `circle-fading-arrow-up`
The icon shows a **fading** circle with an arrow pointing **up** inside it.

`circle` comes first because it is larger than `arrow`. `fading` follows `circle` because it modifies the circle. `up` follows `arrow` because it modifies the arrow.
:::
::: dont <LucideIcon :iconNode="notepadTextDashed" /> `notepad-text-dashed`
This icon shows a dashed notepad with text inside, so name it `notepad-dashed-text`.

`notepad` comes first because it is larger than `text`. `dashed` follows `notepad` because it modifies the notepad. `text` follows both because `dashed` does not modify `text`.
:::
::::

## Summary

When naming an icon:

1. **Describe what you see**, not what the icon could mean.
2. **Use American English** and **lowercase kebab-case**.
3. **Keep related icons together** with `<group>-<variant>`.
4. **Describe what makes an alternate unique** instead of numbering it.
5. **Only use numerals when they are depicted** in the icon.
6. **Order elements from largest to smallest**.
7. If elements are roughly the same size, order them **front to back**, or otherwise in **English reading order**.
8. **Place modifiers after the element they describe**: `<element>-<modifier>`.
