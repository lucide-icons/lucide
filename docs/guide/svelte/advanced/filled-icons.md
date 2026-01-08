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
  template="vue"
  :theme="sandpackTheme"
  :files="sizeIconExample"
  :customSetup='{
    dependencies: {
      "lucide-vue-next": "latest"
    }
  }'
  :options="{
    editorHeight: 480,
    editorWidthPercentage: 60,
  }"
/>
