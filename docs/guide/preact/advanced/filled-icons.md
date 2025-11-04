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
  template="react"
  :theme="sandpackTheme"
  :files="sizeIconExample"
  :customSetup='{
    dependencies: {
      "lucide-react": "latest"
    }
  }'
  :options="{
    editorHeight: 480,
    editorWidthPercentage: 60,
  }"
/>

## Will Lucide have fills in the future?

This feature has been requested several times and discussion is happening at [#458](https://github.com/lucide-icons/lucide/discussions/458).
