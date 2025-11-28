<script setup>
import { Sandpack } from 'sandpack-vue3'
import sandpackTheme from '../../../.vitepress/theme/sandpackTheme.json'
import buttonExampleFiles from './examples/button-example/files.ts'
import iconColorExampleFiles from './examples/color-icon/files.ts'
</script>

# Color

By default, all icons have the color value: `currentColor`. This keyword uses the element's computed text `color` value to represent the icon color.

Read more about [ `currentColor` on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword).

## Adjust the color using the `color` prop

The color can be adjusted by passing the color prop to the element.

::: sandbox {template=react showTabs=false editorHeight=295 editorWidthPercentage=60 dependencies="lucide-react"}

```js
import { Smile } from "lucide-react";

function App() {
  return (
    <div className="app">
      <Smile color="#3e9392" />
    </div>
  );
}

export default App;
```

:::


## Using parent elements text color value

Because the color of lucide icons uses `currentColor`, the color of the icon depends on the computed `color` of the element, or it inherits it from its parent.

For example, if a parent element's color value is `#fff` and one of the children is a lucide icon, the color of the icon will be rendered  as `#fff`. This is browser native behavior.

<!-- ::: sandbox {template=react showTabs=false editorHeight=320 editorWidthPercentage=60 dependencies="lucide-react"}

```jsx /Button.jsx [active]
import { ThumbsUp } from "lucide-react";

function LikeButton() {
  return (
    <button style={{ color: "#fff" }}>
      <ThumbsUp />
      Like
    </button>
  );
}

export default LikeButton;
```

```jsx /App.js [hidden]
import Button from "./Button";

export default function App() {
  return <Button />;
}

```
::: -->


<Sandpack
  template="react"
  :theme="sandpackTheme"
  :files="buttonExampleFiles"
  :customSetup='{
    dependencies: {
      "lucide-react": "latest"
    }
  }'
  :options="{
    editorHeight: 320,
    editorWidthPercentage: 60,
  }"
/>
