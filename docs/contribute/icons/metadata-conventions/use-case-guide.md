---
description: Learn the best practices for writing use cases for Lucide icons.
---

# Use case guide

This guide will teach you how to write the best use cases for Lucide icons.

## Write from the interface's perspective

Describe what the interface communicates to the user. Do not write from the contributor's personal point of view.

:::: example
::: do Indicating a device is offline or unreachable
This describes the **role the icon plays in an interface**.
:::
::: dont I need an icon for my offline device screen
This explains the **contributor's situation**, not the icon's reusable purpose.
:::
::::

## Describe real usage, not the icon name

A use case should explain what the icon means in context. Do not repeat the icon name or describe only the drawing.

:::: example
::: do Representing processors, chips, or embedded hardware
This makes `microchip` useful in search and documentation **without restating the name**.
:::
::: dont it's a microchip icon
This **duplicates the icon name** and does not explain where the icon would be used.
:::
::::

## Add context when it clarifies meaning

Some icons have broad meanings. Add a short context when it makes the use case easier to understand.

:::: example
::: do Applying a level-2 heading in text editors
The phrase explains both the **action and the product area**.
:::
::: dont Applying a heading
This is understandable, but less useful because it **omits the level and interface context**.
:::
::::

## Keep each use case focused

Each entry should contain one clear idea. Split genuinely different meanings into separate entries.

:::: example
::: do Marking parking locations on maps
This is **short, concrete, and focused** on one interface function.
:::
::: dont Marking parking, transport, maps, cars, garages, and places
This reads like a **tag list** and **mixes several concepts** into one use case.
:::
::::

## Write variant-specific use cases

Related icons should describe what makes each variant different.

:::: example
::: do Indicating a low battery charge level
This is specific to `battery-low` and **distinguishes** it from other battery icons.
:::
::: dont Representing battery status
This is **too generic** and could apply to **every battery variant**.
:::
::::

## Avoid references that only make sense in a PR

Use cases should stand on their own after the PR is merged.

:::: example
::: do Signifying a deal, agreement, or partnership
This preserves the **useful meaning** without depending on **outside context**.
:::
::: dont Same as above in #1234
This **depends on a discussion** that readers **may never see**.
:::
::::

## Keep entries concise

Use cases should usually be 4 to 12 words. Prefer one strong phrase over a long explanation.

:::: example
::: do Searching files by name or content
This is **short enough** to scan and **specific enough** to understand.
:::
::: dont This icon can be used when users want to search through all of their files and folders to find something
This is **too long** and reads like **product copy instead of metadata**.
:::
::::

## Do not end with punctuation

Use cases are metadata phrases, not full sentences.

:::: example
::: do Confirming a successful payment
This matches the **phrase style** used across icon metadata.
:::
::: dont Confirming a successful payment.
The period adds **unnecessary punctuation** and makes entries inconsistent.
:::
::::

## Avoid markdown and emoji

Use plain text only. Formatting belongs in documentation, not metadata values.

:::: example
::: do Warning users about a destructive action
This works in search, generated pages, and other **metadata consumers**.
:::
::: dont <span>**Warning** users about a destructive action ⚠️</span>
Markdown and emoji can **leak into generated UI** and make metadata **harder to reuse**.
:::
::::

## Avoid implementation details

Use cases should describe meaning, not how the SVG was built.

:::: example
::: do Representing cropped or trimmed content
This explains the icon's **interface meaning**.
:::
::: dont Showing a rectangle with two path cuts and adjusted Bezier handles
This describes **construction details** that do not help users find or understand the icon.
:::
::::
