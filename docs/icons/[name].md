---
layout: doc
footer: false
aside: false
editLink: false
next: false
prev: false
---
<script setup>
import IconPreview from '../.vitepress/components/IconPreview.vue'
import IconDetailName from '../.vitepress/components/IconDetailName.vue'
import useIconCodeExamples from '../.vitepress/composables/useIconCodeExample.ts'
import { useData } from 'vitepress'

  const { params } = useData()
  const codeExample = useIconCodeExamples(params.value.name)
</script>

<IconPreview
  :name="$params.name"
  :iconNode="$params.iconNode"
  :class="$style.preview"
/>
</div><div>
<IconDetailName>
  {{$params.name}}
</IconDetailName>

::: code-group

```html-vue [HTML]
{{codeExample.html.codes[0].code}}
```

```jsx-vue [React]
{{codeExample.react.codes[0].code}}
```

```vue-vue [Vue]
{{codeExample.vue.codes[0].code}}
```

```svelte-vue [Svelte]
{{codeExample.svelte.codes[0].code}}
```

```jsx-vue [Preact]
{{codeExample.preact.codes[0].code}}
```

```jsx-vue [Solid]
{{codeExample.solid.codes[0].code}}
```

```tsx-vue [Angular]
{{codeExample.angular.codes[0].code}}
```

```html-vue [Font]
{{codeExample.font.codes[0].code}}
```

```html-vue [Flutter]
{{codeExample.flutter.codes[0].code}}
```
:::

<style module>
  .preview {
    margin-bottom: 24px;
  }
</style>
