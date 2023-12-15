<script setup>
import { Sandpack } from 'sandpack-vue3'
import sandpackTheme from '../../.vitepress/theme/sandpackTheme.json'
import sizeIconExample from './examples/size-icon-example/files.ts'
import sizeIconCssExample from './examples/size-icon-css-example/files.ts'
import sizeIconFontExample from './examples/size-icon-font-example/files.ts'
import sizeIconTailwind from './examples/size-icon-tailwind-example/files.ts'
</script>

# Sizing

By default, the size of all icons is `24px` by `24px`. The size is adjustable using the `size` prop and CSS.

## Adjusting the icon size using the `size` prop

<Sandpack
  template="react"
  :theme="sandpackTheme"
  :files="sizeIconExample"
  :customSetup='{
    dependencies: {
      "lucide-react": "latest"
    }
  }'
  :options="{
    editorHeight: 300,
    editorWidthPercentage: 60,
  }"
/>

## Adjusting the icon size via CSS

The CSS properties `width` and `height` can be used to adjust the icon size.

<Sandpack
  template="react"
  :theme="sandpackTheme"
  :files="sizeIconCssExample"
  :customSetup='{
    dependencies: {
      "lucide-react": "latest"
    }
  }'
  :options="{
    editorHeight: 300,
  }"
/>

### Dynamically change the icon size based on the font size

It is possible to resize icons based on font size. This can be achieved using the `em` unit. See this [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size#ems) for more information on the `em` unit.

<Sandpack
  template="react"
  :theme="sandpackTheme"
  :files="sizeIconFontExample"
  :customSetup='{
    dependencies: {
      "lucide-react": "latest"
    }
  }'
  :options="{
    editorHeight: 300,
  }"
/>

### Resizing with Tailwind

`h-*` and `w-*` utilities can be used to adjust the size of the icon.

<Sandpack
  template="react"
  :theme="sandpackTheme"
  :files="sizeIconTailwind"
  :customSetup='{
    dependencies: {
      "lucide-react": "latest",
    }
  }'
  :options="{
    externalResources: ['https://cdn.tailwindcss.com'],
    editorHeight: 300,
    editorWidthPercentage: 60,
  }"
/>

<!-- Code Example -->
