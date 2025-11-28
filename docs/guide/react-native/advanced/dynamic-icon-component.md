# Dynamic Icon Component

It is possible to use one generic icon component to load icons. But it is not recommended, since it is importing all icons during the build. See [Caveats](#caveats).

`DynamicIcon` is useful for applications that want to show icons dynamically by icon name. For example, when using a content management system with where icon names are stored in a database.

For static use cases, it is recommended to import the icons directly.

The same props can be passed to adjust the icon appearance. The `name` prop is required to load the correct icon.

```jsx
import { DynamicIcon } from 'lucide-react/dynamic';

const App = () => (
  <DynamicIcon name="camera" color="red" size={48} />
);
```

<hr>

::: info Caveats

- All icons are imported during build time, which increases build time.
- The bundler will create a separate module for each icon, which can increase the number of network requests.
- You can encounter flashing when loading the icon, since the icon is loaded dynamically.
- When using server-side rendering, you need to make sure that the icon is available during the initial render.
:::
