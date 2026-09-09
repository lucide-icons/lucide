---
description: Learn the best practices for writing tags for Lucide icons.
---

<script setup>
import { batteryLow, calendar, droplet, hospital, mail, mailSearch, search, type } from '~/.vitepress/data/iconNodes';
import LucideIcon from '~/.vitepress/theme/components/base/LucideIcon.vue';
</script>

# Tag guide

This guide shows how to write useful search tags for Lucide icons.

Tags help people find icons by concept, synonym, context, or common wording.

## Use lowercase tags

Tags should always be lowercase.

:::: example
::: do <LucideIcon :iconNode="mail" /> email
Lowercase tags **match the style** used across the icon library.
:::
::: dont <LucideIcon :iconNode="mail" /> Email
Capitalized tags create **inconsistent metadata** without improving search.
:::
::::

## Prefer short tags

Use one clear word when it is enough. Use multi-word tags when the phrase is clearer.

:::: example
::: do <LucideIcon :iconNode="search" /> search
This is **short, common, and easy to find**.
:::
::: dont <LucideIcon :iconNode="search" /> searching through files & folders
This reads like a **use case**, not a tag.
:::
::::

## Use multi-word tags when needed

Some ideas are only clear as a phrase. But keep those phrases short.

:::: example
::: do <LucideIcon :iconNode="droplet" /> blood type
The phrase is **clearer** than either word on its own.
:::
::: dont <LucideIcon :iconNode="droplet" /> blood type medical label
This combines **several search concepts** into one long tag.
:::
::::

## Add synonyms and common wording

Tags can include words people are likely to search for, even if they are not in the icon name.

:::: example
::: do <LucideIcon :iconNode="mail" /> email
This helps users find `mail` icons using a **common synonym**.
:::
::: dont <LucideIcon :iconNode="mail" /> electronic postal message delivery
This is unlikely search wording and **adds noise**.
:::
::::

## Do not repeat the icon name

The icon name is already searchable. Tags should add other ways to find it.

:::: example
::: do <LucideIcon :iconNode="mailSearch" /> message filter
This adds a **related concept** for `mail-search` without duplicating the name.
:::
::: dont <LucideIcon :iconNode="mailSearch" /> mail search
This **repeats the icon name** and does not improve discovery.
:::
::::

## Avoid generic tags

Tags should describe the icon, not say that it is an icon.

:::: example
::: do <LucideIcon :iconNode="calendar" /> event
This points to a **specific idea** users might search for.
:::
::: dont <LucideIcon :iconNode="calendar" /> icon
**Every entry is an icon**, so this tag does not help anyone find the right one.
:::
::::

## Keep tags relevant

Do not add loose terms just to make an icon appear in more searches.

:::: example
::: do <LucideIcon :iconNode="hospital" /> emergency room
This is **relevant** for an icon that marks emergency room locations.
:::
::: dont <LucideIcon :iconNode="hospital" /> doctor nurse pharmacy
These terms may be **nearby concepts**, but they do not all describe the same icon.
:::
::::

## Match the specific variant

Related icons can share family terms, but variant tags should describe what is different.

:::: example
::: do <LucideIcon :iconNode="batteryLow" /> depleted
This distinguishes `battery-low` from **other battery icons**.
:::
::: dont <LucideIcon :iconNode="batteryLow" /> charged
This describes `battery-full` better than `battery-low`.
:::
::::

## Use existing tags as a reference

Check similar icons before adding new tags. Reusing existing terms keeps search predictable.

:::: example
::: do <LucideIcon :iconNode="type" /> typography
This matches existing text-formatting icons and keeps **related icons** together in search.
:::
::: dont <LucideIcon :iconNode="type" /> fontography
Inventing a new term makes the icon harder to find and less consistent with related metadata.
:::
::::
