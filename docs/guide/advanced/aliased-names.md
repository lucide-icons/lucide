# Aliased Names

Icons can have multiple names for the same icon. This is because we choose to rename some icons to make them more consistent with the rest of the icon set, or the name was not generic. For example, the `edit-2` icon is renamed to `pen` to make the name more generic, since it is just a pen icon.

Beside aliases names lucide also includes prefixed and suffixed names to use within your project. This is to prevent import name collisions with other libraries or your own code.

```tsx
// These are all the same icon
import {
  Home,
  HomeIcon,
  LucideHome,
} from "lucide-react";
```


## Choosing import name style



```ts
declare module "lucide-react" {
  export * from "lucide-react/dist/lucide-react.prefixed";
}
```
