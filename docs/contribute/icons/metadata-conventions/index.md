---
description: Learn how to write clear and consistent metadata for Lucide icons.
---

<script setup>
import OverviewLink from '../../../.vitepress/theme/components/base/OverviewLink.vue';
import OverviewLinkGrid from '../../../.vitepress/theme/components/base/OverviewLinkGrid.vue';
</script>

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

The `contributors` field is a list of GitHub usernames for people who created or meaningfully contributed to the icon.

### Contributor rules

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
- Toggling...

### Use case rules

- Keep each use case focused on one idea
- Keep entries concise and specific
- Write from the interface's perspective
- Describe real usage, not the icon name or appearance
- Add context when it clarifies meaning
- Do not end with punctuation
- Do not add markdown and emoji
- Do not add implementation details or PR references

<OverviewLinkGrid>
  <OverviewLink href="./use-case-guide.md" title="Use case guide" desc="Learn the best practices for writing use cases"/>
</OverviewLinkGrid>

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

<OverviewLinkGrid>
  <OverviewLink href="./tag-guide.md" title="Tag guide" desc="Learn the best practices for writing tags"/>
</OverviewLinkGrid>

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
