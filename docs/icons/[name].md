---
layout: doc
footer: false
aside: false
editLink: false
next: false
prev: false
sidebar: true
---
<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import IconPreview from '../.vitepress/theme/components/icons/IconPreview.vue'
import IconInfo from '../.vitepress/theme/components/icons/IconInfo.vue'
import CodeGroup from '../.vitepress/theme/components/base/CodeGroup.vue'
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import { data } from './codeExamples.data'
import { camelCase, startCase } from 'lodash-es'

const { params } = useData()

const tabs = computed(() => data.codeExamples?.map(
  (codeExample) => codeExample.title) ?? []
)

const codeExample = computed(() => data.codeExamples?.map(
    (codeExample) => {
      const pascalCase = startCase(camelCase( params.value.name)).replace(/\s/g, '')
      return codeExample.code.replace(/PascalCase/g, pascalCase).replace(/Name/g, params.value.name)
    }
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
  <IconInfo :icon="$params"/>
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

  .layout {
    align-items: flex-start;
  }

  @media (min-width: 640px) {
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
