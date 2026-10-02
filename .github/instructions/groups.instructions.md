---
applyTo: "groups/*.json"
---
# Groups

A group is a small, reusable set of tags for **one icon variant** — the modifier suffix in an icon name, such as `-plus`, `-check` or `-off`. Icons reference a group with a `"$group:<group-name>"` marker inside their `tags` array, and the marker is replaced at build time with the group's tags.

The file name without `.json` is the group name: the variant suffix it belongs to (`plus` for `file-plus`, `question-mark` for `file-question-mark`), in lowercase kebab-case. Each file has a `$schema`, a one-line `description` saying which meaning the group covers, and a non-empty `tags` array.

```json
{
  "$schema": "../group.schema.json",
  "description": "Action: removing or deleting something",
  "tags": ["remove", "delete"]
}
```

## Rules

- **One group per variant.** Name the group after the variant suffix (`plus`, `minus`, `check`, `cog`), so `file-plus` uses `$group:plus` and `alarm-clock-minus` uses `$group:minus`.
- **Different suffixes with the same meaning share one group.** Do not create a second group for a synonym: `-warning` and `-exclamation-point` use `$group:alert`. When a meaning is spread over many suffixes, name the group after the meaning instead: every currency suffix (`-euro`, `-dollar-sign`, `-japanese-yen`…) uses `$group:currency`.
- **Tags describe what the variant means, not its glyph.** `plus` holds `add`, `new`, `create`; `cog` holds `settings`, `gear`. Do not put the suffix itself (`plus`, `cog`, `lock`) in a group: tags must not repeat the icon name.
- **Keep groups small and generic.** Only tags that hold for *every* icon that uses the group. If a tag is true for just some of them, it belongs on those icons as a literal.
- **Not every icon with the suffix uses the group.** `-off` means "disabled" on `wifi-off` but "allergy free" on `wheat-off`, and `-x` means "delete" on `file-x` but "mute" on `volume-x`. Only icons where the variant carries the group's meaning use the marker; the others keep literal tags.
- **Do not add a group before it is used.** `pnpm checkIcons` warns about groups no icon references.
- **Groups do not nest.** A group's `tags` are literal tags only — no `$extends:` or `$group:` markers.
- Tags are lowercase, and follow the same conventions as icon tags.

Run `pnpm run lint:json:groups` to validate the files against the schema, and `pnpm checkIcons` to check how icons use them.
