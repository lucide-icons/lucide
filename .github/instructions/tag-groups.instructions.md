---
applyTo: "taxonomy/tag-groups/*.json"
---
# Tag groups

A tag group is a small, reusable set of tags that captures **one meaning**. Icons reference a group with a `"$group:<group-name>"` marker inside their `tags` array, and the marker is replaced at build time with the group's tags.

The file name without `.json` is the group name, in lowercase kebab-case. Each file has a `$schema`, a one-line `description` saying which meaning the group covers, and a non-empty `tags` array.

```json
{
  "$schema": "../schemas/tag-group.schema.json",
  "description": "Action: removing or deleting something",
  "tags": ["remove", "delete"]
}
```

## Rules

- **Group by meaning, not by glyph.** Name a group after what the modifier means (`add`, `remove`, `done`), never after the shape that draws it (`plus`, `minus`, `check`). The same glyph means different things on different icons, so a glyph-named group would tie unrelated icons together.
- **Keep groups small and generic.** Only tags that hold for *every* icon that would use the group. If a tag is true for just some of them, it belongs on those icons as a literal.
- **Context-specific tags stay on the icon.** `-off` means "allergy" on food icons but "mute" on audio icons; `-check` means "done" on a list icon but "verified" on `shield-check`. Split those into separate groups, or leave the tag literal on the icon.
- **Do not add a group before it is used.** `pnpm checkIcons` warns about groups no icon references.
- **Groups do not nest.** A group's `tags` are literal tags only — no `$extends:` or `$group:` markers.
- Tags are lowercase, and follow the same conventions as icon tags.

Run `pnpm run lint:json:tag-groups` to validate the files against the schema, and `pnpm checkIcons` to check how icons use them.
