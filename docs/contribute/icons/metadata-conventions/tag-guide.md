---
description: Learn the best practices for writing tags for Lucide icons.
---

<script setup>
import { batteryLow, calendar, droplet, hospital, mail, mailSearch, search, type } from '~/.vitepress/data/iconNodes';
import LucideIcon from '~/.vitepress/theme/components/base/LucideIcon.vue';
</script>

# Tag guide

This guide will teach you how to write useful search tags for Lucide icons.

Tags help people find icons when they search for related concepts, synonyms, contexts, or common alternate wording.

## Use lowercase tags

Tags should always be lowercase so search metadata stays consistent.

:::: example
::: do <LucideIcon :iconNode="mail" /> email
Lowercase tags **match the style** used across the icon library.
:::
::: dont <LucideIcon :iconNode="mail" /> Email
Capitalized tags create **inconsistent metadata** without improving search.
:::
::::

## Prefer short tags

Use one clear word when it carries the meaning. Multi-word tags are fine when they are the clearest search term.

:::: example
::: do <LucideIcon :iconNode="search" /> search
This is **short, common, and easy to match** in search.
:::
::: dont <LucideIcon :iconNode="search" /> searching through files & folders
This reads like a **use case**, not a tag.
:::
::::

## Use multi-word tags when needed

Some concepts are only clear as a phrase. Keep those phrases concise.

:::: example
::: do <LucideIcon :iconNode="droplet" /> blood type
The phrase is **clearer** than either word on its own.
:::
::: dont <LucideIcon :iconNode="droplet" /> blood type medical label
This combines **several search concepts** into one long tag.
:::
::::

## Add synonyms and common wording

Tags can include words people are likely to search for, even when they are not the icon's exact name.

:::: example
::: do <LucideIcon :iconNode="mail" /> email
This helps users find `mail` icons using a **common synonym**.
:::
::: dont <LucideIcon :iconNode="mail" /> electronic postal message delivery
This is unlikely search wording and **adds noise**.
:::
::::

## Do not repeat the icon name

The icon name is already searchable. Tags should add new ways to find the icon.

:::: example
::: do <LucideIcon :iconNode="mailSearch" /> message filter
This adds a **related concept** for `mail-search` without duplicating the name.
:::
::: dont <LucideIcon :iconNode="mailSearch" /> mail search
This **repeats the icon name** and does not improve discovery.
:::
::::

## Avoid generic tags

Tags should describe the icon, not the fact that it is an icon.

:::: example
::: do <LucideIcon :iconNode="calendar" /> event
This points to a **concrete concept** users might search for.
:::
::: dont <LucideIcon :iconNode="calendar" /> icon
**Every entry is an icon**, so this tag does not help anyone find the right one.
:::
::::

## Keep tags relevant

Do not add loosely related terms just to make an icon appear in more searches.

:::: example
::: do <LucideIcon :iconNode="hospital" /> emergency room
This is **relevant** for an icon that marks ER locations.
:::
::: dont <LucideIcon :iconNode="hospital" /> doctor nurse pharmacy
These terms may be **nearby concepts**, but they do not all describe the same icon.
:::
::::

## Match the specific variant

Related icons should share useful family terms, but variant tags should describe what is different.

:::: example
::: do <LucideIcon :iconNode="batteryLow" /> depleted
This distinguishes `battery-low` from **other battery icons**.
:::
::: dont <LucideIcon :iconNode="batteryLow" /> charged
This **better describes** `battery-full`, not `battery-low`.
:::
::::

## Use existing tags as a reference

Check similar icons before inventing new tags. Reusing established terms keeps search behavior predictable.

:::: example
::: do <LucideIcon :iconNode="type" /> typography
This matches existing text-formatting icons and keeps **related icons** grouped in search.
:::
::: dont <LucideIcon :iconNode="type" /> fontography
Inventing a new term makes the icon harder to find and **less consistent** with nearby metadata.
:::
::::
