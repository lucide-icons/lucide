<script setup>
import { Sandpack } from 'sandpack-vue3'
import sandpackTheme from '../../../.vitepress/theme/sandpackTheme.json'
import combineIconsExample from './examples/combining-icons/files.ts'
import combineCustomExample from './examples/combining-icons-custom/files.ts'
import combineNotificationExample from './examples/combining-icons-notification/files.ts'
</script>

# Combining icons

You can combine multiple icons into a single icon by using SVG in SVG.
This is useful for if you want to be creative and make your own custom icons by combining existing icons.

<Sandpack
  template="vanilla"
  :theme="sandpackTheme"
  :files="combineIconsExample"
  :options="{
    editorHeight: 400,
    editorWidthPercentage: 60,
  }"
/>

This is valid SVG and all SVG properties are supported on the icons.
The `x` and `y` coordinates can be adjusted to position the icons as you like.

::: info Limitation
When combining icons, you need to make sure that the `x` and `y` coordinates are within the `viewBox` of the outer icon (24x24).
:::

## With custom SVG elements

You can also use SVG elements to create your own icons.

## Example with notification badge

<Sandpack
  template="vanilla"
  :theme="sandpackTheme"
  :files="combineNotificationExample"
  :options="{
    editorHeight: 480,
    editorWidthPercentage: 60,
  }"
/>

## Example with text element

You can also use the `text` SVG element to add text to your icon.

<Sandpack
  template="vanilla"
  :theme="sandpackTheme"
  :files="combineCustomExample"
  :options="{
    editorHeight: 480,
    editorWidthPercentage: 60,
  }"
/>
