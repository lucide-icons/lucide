---
description: Learn the best practices for writing use cases for Lucide icons.
---

<script setup>
import { batteryLow, creditCard, crop, handshake, heading2, microchip, search, squareParking, triangleAlert, wifiOff } from '~/.vitepress/data/iconNodes';
import LucideIcon from '~/.vitepress/theme/components/base/LucideIcon.vue';
</script>

# Use case guide

This guide shows how to write clear use cases for Lucide icons.

## Write from the interface's perspective

Describe what the interface tells the user. Do not write from the contributor's point of view.

:::: example
::: do <LucideIcon :iconNode="wifiOff" /> Indicating a device is offline or unreachable
This describes the **role the icon plays in an interface**.
:::
::: dont <LucideIcon :iconNode="wifiOff" /> I need an icon for my offline device screen
This explains the **contributor's situation**, not the icon's purpose.
:::
::::

## Describe real usage, not the icon name

A use case should explain what the icon means in context. Do not repeat the icon name or only describe the drawing.

:::: example
::: do <LucideIcon :iconNode="microchip" /> Representing processors, chips, or embedded hardware
This explains `microchip` **without repeating the name**.
:::
::: dont <LucideIcon :iconNode="microchip" /> it's a microchip icon
This **duplicates the icon name** and does not explain where the icon would be used.
:::
::::

## Add context when it clarifies meaning

Some icons have broad meanings. Add context when it makes the use case clearer.

:::: example
::: do <LucideIcon :iconNode="heading2" /> Applying a level-2 heading in text editors
The phrase explains both the **action and the product area**.
:::
::: dont <LucideIcon :iconNode="heading2" /> Applying a heading
This is less useful because it **omits the level and context**.
:::
::::

## Keep each use case focused

Each entry should cover one clear idea. Split different meanings into separate entries.

:::: example
::: do <LucideIcon :iconNode="squareParking" /> Marking parking locations on maps
This is **short, clear, and focused** on one interface function.
:::
::: dont <LucideIcon :iconNode="squareParking" /> Marking parking, transport, maps, cars, garages, and places
This reads like a **tag list** and **mixes several ideas**.
:::
::::

## Write variant-specific use cases

For related icons, describe what makes each variant different.

:::: example
::: do <LucideIcon :iconNode="batteryLow" /> Indicating a low battery charge level
This is specific to `battery-low` and **sets it apart** from other battery icons.
:::
::: dont <LucideIcon :iconNode="batteryLow" /> Representing battery status
This is **too generic** and could apply to **every battery variant**.
:::
::::

## Avoid pull request references

Use cases should make sense after the pull request is merged.

:::: example
::: do <LucideIcon :iconNode="handshake" /> Signifying a deal, agreement, or partnership
This keeps the **useful meaning** without depending on **outside context**.
:::
::: dont <LucideIcon :iconNode="handshake" /> Same as above in #1234
This **depends on a discussion** readers **may never see**.
:::
::::

## Keep entries concise

Use cases should usually be 4 to 12 words. Prefer a short phrase over a long explanation.

:::: example
::: do <LucideIcon :iconNode="search" /> Searching files by name or content
This is **short enough** to scan and **specific enough** to understand.
:::
::: dont <LucideIcon :iconNode="search" /> This icon can be used when users want to search through all of their files and folders to find something
This is **too long** and reads like **product copy instead of metadata**.
:::
::::

## Do not end with punctuation

Use cases are metadata phrases, not full sentences.

:::: example
::: do <LucideIcon :iconNode="creditCard" /> Confirming a successful payment
This matches the **phrase style** used across icon metadata.
:::
::: dont <LucideIcon :iconNode="creditCard" /> Confirming a successful payment.
The period adds **unnecessary punctuation** and makes entries inconsistent.
:::
::::

## Avoid markdown and emoji

Use plain text only. Formatting belongs in documentation, not metadata values.

:::: example
::: do <LucideIcon :iconNode="triangleAlert" /> Warning users about a destructive action
This works in search, generated pages, and other places that use metadata.
:::
::: dont <LucideIcon :iconNode="triangleAlert" /> <span>**Warning** users about a destructive action ⚠️</span>
Markdown and emoji can **show up in generated UI** and make metadata **harder to reuse**.
:::
::::

## Avoid implementation details

Use cases should describe meaning, not how the SVG was made.

:::: example
::: do <LucideIcon :iconNode="crop" /> Representing cropped or trimmed content
This explains the icon's **interface meaning**.
:::
::: dont <LucideIcon :iconNode="crop" /> Showing a rectangle with two path cuts and adjusted Bezier handles
This describes **construction details** that do not help people find or understand the icon.
:::
::::
