---
applyTo: "icons/*.json"
---
# JSON Metadata Descriptor

The schema for the JSON metadata descriptor can be found in `icon.schema.json`. It defines the required and optional properties for the JSON files that accompany each icon. The JSON metadata descriptor should be placed in the same directory as the SVG file of the icon and should have the same name as the SVG file, but with a `.json` extension. For example, if the SVG file is named `home.svg`, the JSON metadata descriptor should be named `home.json`.

## Contributors

The `contributors` property is a required array of GitHub usernames for the people who created or contributed to the icon. It is used to give credit to contributors and to track the icon's history. Add the PR author to the `contributors` array if they are not already listed and they have made a significant contribution to the icon's SVG.

## Tags

The `tags` property is an array of strings that describe the icon and can be used for searching.
Validate the tags against the `icon.schema.json` to ensure they are correctly formatted and adhere to the defined structure.
Provide tag suggestions based on the name of the icon and the use cases provided in the PR description. Use the existing tags in the repository as a reference for consistency and to avoid duplicates. Don't suggest words like: 'icon' and preferably use single words. Tags should always be in lowercase and should not contain spaces. The name of icon should not be included in the tags, as it is already specified.

# Categories

The `categories` property is an array of strings that specify the categories to which the icon belongs, such as "devices", "interface", "media", etc. See the `categories` property in the `icon.schema.json` for more details on the allowed values. The categories should be chosen based on the use cases provided in the PR description and the existing categories in the repository. The categories should be relevant to the icon and should help users find the icon when searching for specific types of icons. The name of icon should not be included in the categories, as it is already specified. Suggest categories based on the name of the icon and the use cases provided in the PR description. Use the existing categories in the repository as a reference for consistency and to avoid duplicates. Categories should always be in lowercase and should not contain spaces.

## Extending metadata from other icons

Some icons are variants or combinations of other icons (for example `alarm-clock-minus` builds on `alarm-clock` and `minus`). Instead of repeating the same values, an icon can inherit `tags`, `categories`, or `contributors` from another icon using an inline `"$extends:<icon-name>"` marker placed directly inside the relevant array. At build time each marker is replaced, in place, with the referenced icon's fully resolved values for that same field.

```jsonc
{
  "tags": ["$extends:alarm-clock", "$extends:minus", "remove"],
  "categories": ["$extends:alarm-clock", "devices"],
  "contributors": ["$extends:alarm-clock", "some-user"]
}
```

When checking or adding a `$extends:` marker:

- A marker must be exactly `"$extends:"` followed by the name of an **existing** icon — one that has its own `icons/<icon-name>.json` and `icons/<icon-name>.svg`. The icon name is the file name without the `.json` extension, written in lowercase kebab-case. Referencing a non-existent icon is invalid.
- Markers are only supported inside the `tags`, `categories`, and `contributors` arrays. They are not a separate property.
- An icon may not extend itself, and circular chains (A extends B, B extends A) are not allowed.
- Ordering is preserved: inherited values are inserted at the marker's position, so place `$extends:` markers where the inherited values should appear (conventionally first, before the icon's own literal values).
- Run `pnpm checkIcons` to validate all references. It fails on missing icons, self-references, and circular dependencies. Do not assume a marker is valid without confirming the target icon exists.

### There should not be duplicates

Never list a value that a `$extends:` marker already provides. Before adding a literal `tag`, `category`, or `contributor`, look at the referenced icon's metadata: if that icon already contains the value, do not also add it as a literal entry in the same array — the inherited value already covers it. For example, if `alarm-clock` already has the tag `morning`, an icon that uses `"$extends:alarm-clock"` in its `tags` must **not** also list `"morning"`.

Likewise, do not reference the same icon more than once in a single field (no duplicate `$extends:` markers), and do not repeat literal values. The `tags`, `categories`, and `contributors` arrays must contain only unique entries (`uniqueItems` in `icon.schema.json`), and after extends resolution the final arrays must not contain any duplicates.
