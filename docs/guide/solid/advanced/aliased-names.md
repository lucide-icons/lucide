---
title: Aliased Names - Solid
description: Learn about the different import name styles available for Lucide icons in your Solid project and how to choose the one that best fits your needs.
---

# Aliased Names

Some icons have multiple names. This is because we sometimes choose to rename them to make them more consistent with the rest of the icon set, or the name was not generic. For example, the `edit-2` icon is renamed to `pen` to make the name more generic, since it is just a pen icon.

Beside these aliases, Lucide also includes prefixed and suffixed names to use within your project. This is to prevent import name collisions with other libraries or your own code.

```tsx
// These are all the same icon
import {
  House,
  HouseIcon,
  LucideHouse,
} from "lucide-solid";
```

### Turn off autocomplete in your IDE

```json [.vscode/settings.json]
{
  "js/ts.preferences.autoImportFileExcludePatterns": [
    "lucide-solid",
  ]
}
```
