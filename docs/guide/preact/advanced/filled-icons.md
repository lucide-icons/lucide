---
head:
  - - link
    - rel: canonical
      href: https://lucide.dev/guide/vue/advanced/filled-icons
---

<script setup>
import { Sandpack } from 'sandpack-vue3'
import sandpackTheme from '../../../.vitepress/theme/sandpackTheme.json'
import sizeIconExample from './examples/filled-icon-example/files.ts'
</script>

# Filled Icons

Fills are officially not supported.
However, all SVG properties are available on all icons.
Fill can still be used and will work fine on certain icons.

Example with stars:

<Sandpack
  template="vanilla"
  :theme="sandpackTheme"
  :files="sizeIconExample"
  :options="{
    editorHeight: 480,
    editorWidthPercentage: 60,
  }"
/>
