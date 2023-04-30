---
layout: doc
footer: false
aside: false
editLink: false
next: false
prev: false
sidebar: true
---
<script setup>
import { computed } from 'vue'
import IconPreview from '../.vitepress/components/IconPreview.vue'
import IconDetailName from '../.vitepress/components/IconDetailName.vue'
import { useData } from 'vitepress'
import CodeGroup from '../.vitepress/components/CodeGroup.vue'

const { params } = useData()

const tabs = computed(() => params.value.codeExamples?.map(
  (codeExample) => codeExample.title) ?? []
)

const codeExample = computed(() => params.value.codeExamples?.map(
    (codeExample) => codeExample.code
  ).join('') ?? []
)
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

<CodeGroup :groups="tabs" groupName="icon-code-example">
  <div
    class="blocks"
    v-html="codeExample"
  />
</CodeGroup>

<style module>
  .preview {
    margin-bottom: 24px;
  }
</style>
