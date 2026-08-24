---
description: Learn how to write clear and consistent metadata for Lucide icons.
---

# Metadata conventions

Every Lucide icon has a matching JSON metadata file. Metadata helps credit contributors, categorize icons, improve search, and explain where an icon is useful.

Use this guide when adding a new icon or reviewing metadata for an existing icon.

## Metadata file location

Each icon metadata file must live next to its SVG file in the `icons` directory.

The JSON file must use the same base name as the SVG file:

- `home.svg` -> `home.json`
- `arrow-up.svg` -> `arrow-up.json`
- `square-parking.svg` -> `square-parking.json`

All icon metadata files are validated against `icon.schema.json`.

## Required fields

Every icon metadata file must include:

- `$schema`
- `contributors`
- `use-cases`
- `tags`
- `categories`

A minimal metadata file looks like this:

```json
{
  "$schema": "../icon.schema.json",
  "contributors": [
    "github-username",
    "another-github-username"
  ],
  "use-cases": [
    "Representing example items in an interface"
  ],
  "tags": [
    "foo",
    "bar"
  ],
  "categories": [
    "devices"
  ]
}
```

## Contributors

The `contributors` field is a list of GitHub usernames for people who created or meaningfully contributed to the icon:

1. If you create a new icon based on existing ones, add all contributors from all base icons.

2. Add a username when someone made a significant contribution to the SVG itself.

3. Do not add people for minor review comments, metadata-only edits, or unrelated discussion.

## Use cases

The `use-cases` field explains where and why an icon would be used in a real interface.

Use cases should be short phrases, not full sentences. Start with a present participle verb such as:

- Representing...
- Indicating...
- Marking...
- Showing...
- Confirming...
- Toggling...
- Categorizing...
- Searching...

Keep each use case focused on one idea. Prefer 1 to 4 strong use cases over a long list of weak or repetitive ones.

:::: example

### Write from the interface's perspective

Describe what the interface communicates to the user. Do not write from the contributor's personal point of view.

::: do Indicating a device is offline or unreachable
This describes the role the icon plays in an interface.
:::

::: dont I need an icon for my offline device screen
This explains the contributor's situation, not the icon's reusable purpose.
:::
::::

:::: example

### Describe real usage, not the icon name

A use case should explain what the icon means in context. Do not repeat the icon name or describe only the drawing.

::: do Representing processors, chips, or embedded hardware
This makes `microchip` useful in search and documentation without restating the name.
:::

::: dont microchip
This duplicates the icon name and does not explain where the icon would be used.
:::
::::

:::: example

### Add context when it clarifies meaning

Some icons have broad meanings. Add a short context when it makes the use case easier to understand.

::: do Applying a level-2 heading in text editors
The phrase explains both the action and the product area.
:::

::: dont Applying a heading
This is understandable, but less useful because it omits the level and interface context.
:::
::::

:::: example

### Keep each use case focused

Each entry should contain one clear idea. Split genuinely different meanings into separate entries.

::: do Marking parking locations on maps
This is short, concrete, and focused on one interface function.
:::

::: dont Marking parking, transport, maps, cars, garages, and places
This reads like a tag list and mixes several concepts into one use case.
:::
::::

:::: example

### Write variant-specific use cases

Related icons should describe what makes each variant different.

::: do Indicating a low battery charge level
This is specific to `battery-low` and distinguishes it from other battery icons.
:::

::: dont Representing battery status
This is too generic and could apply to every battery variant.
:::
::::

:::: example

### Avoid references that only make sense in a PR

Use cases should stand on their own after the PR is merged.

::: do Signifying a deal, agreement, or partnership
This preserves the useful meaning without depending on outside context.
:::

::: dont Same as above in #1234
This depends on a discussion that readers may never see.
:::
::::

:::: example

### Keep entries concise

Use cases should usually be 4 to 12 words. Prefer one strong phrase over a long explanation.

::: do Searching files by name or content
This is short enough to scan and specific enough to understand.
:::

::: dont This icon can be used when users want to search through all of their files and folders to find something
This is too long and reads like product copy instead of metadata.
:::
::::

:::: example

### Do not end with punctuation

Use cases are metadata phrases, not full sentences.

::: do Confirming a successful payment
This matches the phrase style used across icon metadata.
:::

::: dont Confirming a successful payment.
The period adds unnecessary punctuation and makes entries inconsistent.
:::
::::

:::: example

### Avoid markdown and emoji

Use plain text only. Formatting belongs in documentation, not metadata values.

::: do Warning users about a destructive action
This works in search, generated pages, and other metadata consumers.
:::

::: dont <span>**Warning** users about a destructive action ⚠️</span>
Markdown and emoji can leak into generated UI and make metadata harder to reuse.
:::
::::

:::: example

### Avoid implementation details

Use cases should describe meaning, not how the SVG was built.

::: do Representing cropped or trimmed content
This explains the icon's interface meaning.
:::

::: dont Showing a rectangle with two path cuts and adjusted Bezier handles
This describes construction details that do not help users find or understand the icon.
:::
::::

## Tags

The `tags` field is a list of search terms for the icon.

Tags should describe concepts, synonyms, related terms, and common contexts that help people find the icon.

Use existing tags in the repository as a reference before adding new ones. This keeps search behavior consistent and avoids unnecessary duplicates.

### Tag rules

- Use lowercase tags.
- Prefer single words where possible.
- Multi-word tags are allowed when they are clearer, such as `magnifying glass`.
- Do not include the icon name as a tag.
- Do not add generic tags like `icon`.
- Do not add unrelated concepts just to increase search coverage.

For example, a `mail-search` icon can use tags such as `email`, `message`, `letter`, `find`, and `filter`, but it should not include `mail-search` as a tag.

## Categories

The `categories` field groups icons into broad areas of use.

Categories must come from the allowed category list in `icon.schema.json`.

Choose categories based on what the icon represents and where it is commonly used. Use existing icon metadata as a reference for similar icons.

### Category rules

- Use only categories allowed by `icon.schema.json`.
- Use lowercase category names.
- Do not invent new categories in icon metadata.
- Choose relevant categories only.

## Variants and related icons

Related icons should have related metadata, but they should not blindly share identical use cases.

Write metadata for the specific variant:

- `battery-low` -> `Indicating a low battery charge level`
- `battery-full` -> `Indicating a full battery charge level`
- `square-arrow-right-enter` -> sign in, enter, or join contexts
- `square-arrow-right-exit` -> sign out, exit, or export contexts

When a request covers several icons at once, only assign a use case to the icon it actually describes. Do not let metadata from one icon leak into another icon in the same group.

## Aliases

Some icons can include an optional `aliases` field for alternate names.

For the present, we only add aliases to icons when renaming them from non-compliant names.

## Validation

Before submitting metadata changes, validate the icon JSON files:

```sh
pnpm run lint:json:icons
```

You can also format changed files with Prettier:

```sh
pnpm exec prettier "icons/*.json" --check
```

## Checklist

Before opening a PR, confirm that:

- The JSON file name matches the SVG file name.
- The file includes all required fields.
- Contributors are GitHub usernames.
- Use cases describe real interface usage.
- Tags are lowercase and useful for search.
- Categories are allowed by `icon.schema.json`.
- Metadata is specific to the icon and its variants.
- `pnpm run lint:json:icons` passes.
