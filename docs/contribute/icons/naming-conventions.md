---
description: Learn how to choose clear and consistent names for Lucide icons.
---
<script setup>
import { arrowDown01, badgePlus, badgeCheck, sendHorizontal, heartCrack, circleDashed, circleUser, clock3, userRound, save, ban, pencilRuler } from '~/.vitepress/data/iconNodes';
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

Learn how to choose clear and consistent names for Lucide icons.

This section covers general naming rules, word order, modifiers, variants, related icons, and other conventions used to keep icon names predictable across the library.

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

Icon names **must** use American English names, as opposed to local variants.

:::: example
::: do <span>`color`, `maximize`, `center`</span>
:::
::: dont <span>`colour`, `maximise`, `centre`</span>
:::
::::

## 3. Name icons for what they depict

Icon names **must** describe what the icon depicts, not its intended use or meaning.

:::: example
::: do <LucideIcon :iconNode="save" /> `floppy-disk`
The icon **depicts** a floppy disk.
:::
::: dont <LucideIcon :iconNode="save" /> `save`
Save is a use case.
:::
::::

:::: example
::: do <LucideIcon :iconNode="ban" /> `circle-slash`
The icon **depicts** a circle with a slash across it.
:::
::: dont <LucideIcon :iconNode="ban" /> `ban`
Ban is an action.
:::
::::

::: tip
An icon can represent different actions or concepts depending on where and how it is used. Naming icons for their visual appearance keeps names unambiguous and independent of their use case.
:::

## 4. Name related icons consistently

Icons that belong to the same group **must** use the `<group>-<variant>` naming scheme.

The group name comes first, followed by the part that distinguishes the icon from the rest of the group.

:::: example
::: do <span><LucideIcon :iconNode="badgePlus" /> + <LucideIcon :iconNode="badgeCheck" /></span> <span>`badge-plus` & `badge-check`</span>
`badge` is the group.
:::
::: dont <span><LucideIcon :iconNode="badgePlus" /> + <LucideIcon :iconNode="badgeCheck" /></span> <span>`plus-badge` & `check-badge`</span>
`plus` and `check` are not the group.
:::
::::

## 5. Describe alternate icons

Alternate versions of an icon **must** be named for what makes them visually distinct. They **must not** use numbers merely to distinguish one version from another.

:::: example
::: do <LucideIcon :iconNode="sendHorizontal" /> `send-horizontal`
The icon depicts a horizontal "send" symbol.
:::
::: dont <LucideIcon :iconNode="sendHorizontal" /> <span>`send-2` or `send-alt`</span>
"send no. 2" or "alternative send" are not descriptive names.
:::
::::

## 6. Only use numerals when depicted

Icon names **must not** contain numerals unless the numeral itself is depicted in the icon.

:::: example
::: do <LucideIcon :iconNode="arrowDown01" /> `arrow-down-0-1`
The arrow points from 0 to 1.
:::
::: dont <LucideIcon :iconNode="sendHorizontal" /> `send-2`
The icon doesn't feature the number 2.
:::
::::

:::: example
::: do <LucideIcon :iconNode="clock3" /> `clock-3`
The hands point to 3 o'clock.
:::
::: dont <LucideIcon :iconNode="userRound" /> `user-3`
The icon doesn't feature the number 3.
:::
::::


Numerals must not be used to distinguish between otherwise similarly named icons.

## 7. Order elements by size

When an icon depicts multiple elements of different sizes, their names **must** be ordered from largest to smallest.

For an icon containing a circle and a person:

:::: example
::: do <LucideIcon :iconNode="circleUser" /> `circle-person`
The circle is larger.
:::
::: dont <LucideIcon :iconNode="circleUser" /> `person-circle`
The person is **not** larger.
:::
::::

## 8. Order equally sized elements by position

When an icon depicts multiple elements of roughly equal size, their names **must** be ordered according to their visual position.

If elements overlap, name them from front to back.

If they do not overlap, name them in English reading order: top to bottom, then left to right.

:::: example
::: do <LucideIcon :iconNode="pencilRuler" /> `pencil-ruler`
The pencil is in front of the ruler.
:::
::: dont <LucideIcon :iconNode="pencilRuler" /> `ruler-pencil`
The ruler is **not** in front of the pencil.
:::
::::

:::: example
::: do <LucideIcon :iconNode="pencilRulerVertical" /> `pencil-ruler`
The pencil is left of the ruler.
:::
::: dont <LucideIcon :iconNode="pencilRulerHorizontal" /> `ruler-pencil`
The ruler is **not** above the pencil.
:::
::::

## 9. Place modifiers after the element they describe

Modifiers **must** follow the element they describe, using the `<element>-<modifier>` naming scheme.

:::: example
::: do <LucideIcon :iconNode="circleDashed" /> `circle-dashed`
:::
::: dont <LucideIcon :iconNode="circleDashed" /> `dashed-circle`
:::
::::

:::: example
::: do <LucideIcon :iconNode="heartCrack" /> `heart-broken`
:::
::: dont <LucideIcon :iconNode="heartCrack" /> `broken-heart`
:::
::::

When an icon contains multiple modified elements, each modifier follows its respective element.

For example, a dashed circle containing a smaller broken heart is named:

`circle-dashed-heart-broken`

This follows both the element ordering and modifier rules:

- `circle` comes before `heart` because it is larger.
- `dashed` follows `circle` because it modifies the circle.
- `broken` follows `heart` because it modifies the heart.

## TL;DR

When naming an icon:

1. **Describe what you see**, not what the icon could mean or be used for.
2. **Use American English** and **lowercase kebab-case**.
3. **Keep related icons together** using `<group>-<variant>`.
4. **Describe what makes an alternate unique** instead of numbering it.
5. **Only use numerals when they are depicted** in the icon.
6. **Order elements from largest to smallest**.
7. If elements are roughly the same size, order them **front to back**, or otherwise in **English reading order**.
8. **Place modifiers after the element they describe**: `<element>-<modifier>`.

For example, a dashed circle containing a smaller broken heart becomes:

`circle-dashed-heart-broken`
