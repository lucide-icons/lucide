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

<div :class="$style.layout">
  <div>
    <IconPreview
      :name="$params.name"
      :iconNode="$params.iconNode"
      :class="$style.preview"
    />
  </div>
  <div>
    <IconDetailName>
      {{$params.name}}
    </IconDetailName>
  </div>
</div>

<CodeGroup :groups="tabs" groupName="icon-code-example">
  <div
    class="blocks"
    v-html="codeExample"
  />
</CodeGroup>

<style module>
  .preview {
    margin-bottom: 24px;
    max-width: 240px;
  }

   (min-width: 640px) {
    .layout {
      align-items: flex-start;
      display: grid;
      grid-template-columns: 240px minmax(0, 1fr);
      gap: 24px;
    }

    .preview {
      margin: 0 auto;
    }
  }
</style>
