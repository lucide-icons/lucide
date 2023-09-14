<script setup>
import { Sandpack } from 'sandpack-vue3'
import sandpackTheme from '../../.vitepress/theme/sandpackTheme.json'
import sizeIconExample from './examples/size-icon-example/files.ts'
import sizeIconCssExample from './examples/size-icon-css-example/files.ts'
import sizeIconFontExample from './examples/size-icon-font-example/files.ts'
import sizeIconTailwind from './examples/size-icon-tailwind-example/files.ts'
</script>

# Sizing

By default the size of the icons are `24px` . This is adjustable by using passing the `size` prop or change it by using CSS.

## Adjusting size with `size` prop

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
  }"
/>

## Adjusting size with CSS
Width and height can be used to adjust icon size.

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


### Resize based on font size

It is possible to resize icons based on font size. This can be accomplished by using the `em` 's to resize based on font size.

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

`h-*` and `w-*` utlities can be used to adjust the size of the icon.

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
  }"
/>

<!-- Code Example -->
