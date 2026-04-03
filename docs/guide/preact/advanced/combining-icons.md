---
title: Combining icons - Preact
description: Learn how to combine multiple icons into a single icon nested SVG elements in your Preact application.
---
<script setup>
import Sandpack from '~/.vitepress/theme/components/editors/SandpackPreact.vue'
</script>

# Combining icons

You can combine multiple icons into a single icon by nesting SVG elements.
This is useful if you want to create custom icons by combining existing ones.

::: sandpack {showTabs=false editorHeight=400 editorWidthPercentage=60 dependencies="lucide-preact"}

```jsx App.js [active]
import { Scan, User } from "lucide-preact";
import { h } from "preact";

function App() {
  return (
    <div className="app">
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

::: sandpack {showTabs=false editorHeight=580 editorWidthPercentage=60 dependencies="lucide-preact"}

```jsx App.js [active]
import { Mail } from "lucide-preact";
import { h } from "preact";

function App() {
  const hasUnreadMessages = true;

  return (
    <div className="app">
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

::: sandpack {showTabs=false editorHeight=400 editorWidthPercentage=60 dependencies="lucide-preact"}

```jsx App.js [active]
import { File } from "lucide-preact";
import { h } from "preact";

function App() {
  return (
    <div className="app">
      <File size={48}>
        <text
          x={7.5}
          y={19}
          font-size={8}
          font-family="Verdana,sans-serif"
          stroke-width={1}
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
