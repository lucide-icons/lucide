---
title: Writing Icon Metadata
description: Metadata conventions for icons in the Lucide icon library.
---

# Writing Icon Metadata

Each icon added must also come with a matching JSON file listing tags and categories for the icon.
Please use the following template:

```json
{
  "$schema": "../icon.schema.json",
  "contributors": [
    "github-username",
    "another-github-username"
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