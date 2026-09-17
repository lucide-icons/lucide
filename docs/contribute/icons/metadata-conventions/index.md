---
description: Learn how to write clear and consistent metadata for Lucide icons.
---

<script setup>
import OverviewLink from '../../../.vitepress/theme/components/base/OverviewLink.vue';
import OverviewLinkGrid from '../../../.vitepress/theme/components/base/OverviewLinkGrid.vue';
</script>

# Metadata conventions

Every Lucide icon has a matching JSON metadata file. Metadata credits contributors, groups icons, improves search, and explains where an icon is useful.

Use this guide when you add a new icon or review existing metadata.

## Metadata file location

Each icon metadata file must live next to its SVG file in the `icons` directory.

The JSON file must use the same base name as the SVG file:

- `home.svg` -> `home.json`
- `arrow-up.svg` -> `arrow-up.json`
- `square-parking.svg` -> `square-parking.json`

All icon metadata files must pass `icon.schema.json`.

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
  "contributors": ["github-username", "another-github-username"],
  "use-cases": ["Representing example items in an interface"],
  "tags": ["foo", "bar"],
  "categories": ["devices"]
}
```

## Contributors

The `contributors` field lists GitHub usernames for people who created or meaningfully changed the icon.

### Contributor rules

1. If you create a new icon based on existing ones, add all contributors from all base icons.
2. Add a username when someone made a significant change to the icon design.
3. Do not add people for minor review comments, metadata-only edits, or unrelated discussion.

## Use cases

The `use-cases` field explains where and why someone would use the icon in an interface.

Use cases should be short phrases, not full sentences. Start with an `-ing` verb, such as:

- Representing [concept]
- Indicating [state]
- Marking [item]
- Showing [information]
- Toggling [setting]

### Use case rules

- Keep each use case focused on one idea
- Keep entries concise and specific
- Write from the interface's perspective
- Describe real usage, not the icon name or appearance
- Add context when it clarifies meaning
- Do not end with punctuation
- Do not add Markdown or emoji
- Do not add implementation details or pull request references

<OverviewLinkGrid>
  <OverviewLink href="./use-case-guide.md" title="Use case guide" desc="Learn the best practices for writing use cases"/>
</OverviewLinkGrid>

## Tags

The `tags` field is a list of search terms for the icon.

Tags should describe concepts, synonyms, related terms, and common contexts.

Check existing tags before adding new ones. This keeps search consistent and avoids duplicates.

### Tag rules

- Use lowercase tags.
- Prefer single words where possible.
- Multi-word tags are allowed when they are clearer, such as `magnifying glass`.
- Do not include the icon name as a tag.
- Do not add generic tags like `icon`.
- Do not add unrelated concepts just to increase search coverage.

For example, `mail-search` can use tags like `email`, `message`, `letter`, `find`, and `filter`, but not `mail`, `search` or `mail search`.

<OverviewLinkGrid>
  <OverviewLink href="./tag-guide.md" title="Tag guide" desc="Learn the best practices for writing tags"/>
</OverviewLinkGrid>

## Categories

The `categories` field groups icons by broad use.

Categories must come from the allowed category list in `icon.schema.json`.

Choose categories based on what the icon represents and where people use it. Check similar icons first.

### Category rules

- Use only categories allowed by `icon.schema.json`.
- Use lowercase category names.
- Do not invent new categories in icon metadata.
- Choose relevant categories only.

## Variants and related icons

Related icons should have related metadata, but do not copy use cases blindly.

Write metadata for the specific variant:

- `battery-low` -> `Indicating a low battery charge level`
- `battery-full` -> `Indicating a full battery charge level`
- `square-arrow-right-enter` -> sign in, enter, or join contexts
- `square-arrow-right-exit` -> sign out, exit, or export contexts

When a request covers several icons, assign each use case only to the icon it describes. Do not copy metadata to icons it does not describe.

## Aliases

Some icons can include an optional `aliases` field for alternate names.

Only add aliases when an icon has been renamed from a non-compliant name.

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

Before opening a pull request, confirm that:

- The JSON file name matches the SVG file name.
- The file includes all required fields.
- Contributors are GitHub usernames.
- Use cases describe real interface usage.
- Tags are lowercase and useful for search.
- Categories are allowed by `icon.schema.json`.
- Metadata is specific to the icon and its variants.
- `pnpm run lint:json:icons` passes.
