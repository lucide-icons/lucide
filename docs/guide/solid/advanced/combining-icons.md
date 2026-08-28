---
title: Combining icons - Solid
description: Learn how to combine multiple icons into a single icon nested SVG elements in your Solid application.
---
<!-- Not working yet -->
<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/Sandpack.vue'
</script>

# Combining icons

You can combine multiple icons into a single icon by nesting SVG elements.
This is useful if you want to create custom icons by combining existing ones.

::: sandpack {template=vite-solid showTabs=false editorHeight=400 editorWidthPercentage=60 dependencies="lucide-solid"}

```tsx App.tsx [active]
import Scan from 'lucide-solid/icons/scan';
import User from 'lucide-solid/icons/user';

function App() {
  return (
    <div class="app">
      <Scan size={48}>
        <User
          size={12}
          x={6}
          y={6}
          absoluteStrokeWidth
        />
      </Scan>
    </div>
  );
}

export default App;
```

:::

This is valid, since [SVGs can be nested](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/svg#nested_svg_element), and all SVG properties are supported on the icons.
The `x` and `y` coordinates can be adjusted to position the icons as you like.

::: info Limitation
When combining icons, you need to make sure that the `x` and `y` coordinates are within the `viewBox` of the outer icon (24x24).
:::

## With native SVG elements

You can also combine Lucide icons with native SVG elements to build custom icon variations.

### Example with notification badge

For example, you can add a notification badge to an icon by using the `circle` SVG element.

::: sandpack {template=vite-solid showTabs=false editorHeight=580 editorWidthPercentage=60 dependencies="lucide-solid"}

```tsx App.tsx [active]
import Mail from 'lucide-solid/icons/mail';

function App() {
  const hasUnreadMessages = true;

  return (
    <div class="app">
      <Mail size={48}>
        {hasUnreadMessages && (
          <circle
            r="3"
            cx="21"
            cy="5"
            stroke="none"
            fill="#F56565"
          />
        )}
      </Mail>
    </div>
  );
}

export default App;
```

:::

### Example with text element

You can also use the `text` SVG element to add text to your icon.

::: sandpack {template=vite-solid showTabs=false editorHeight=400 editorWidthPercentage=60 dependencies="lucide-solid"}

```tsx App.tsx [active]
import File from 'lucide-solid/icons/file';

function App() {
  return (
    <div class="app">
      <File size={48}>
        <text
          x={7.5}
          y={19}
          fontSize={8}
          fontFamily="Verdana,sans-serif"
          strokeWidth={1}
        >
          JS
        </text>
      </File>
    </div>
  );
}

export default App;
```

:::
