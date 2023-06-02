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
import { useData } from 'vitepress'
import IconPreview from '../.vitepress/theme/components/icons/IconPreview.vue'
import IconPreviewSmall from '../.vitepress/theme/components/icons/IconPreviewSmall.vue'
import IconInfo from '../.vitepress/theme/components/icons/IconInfo.vue'
import IconContributors from '../.vitepress/theme/components/icons/IconContributors.vue'
import RelatedIcons from '../.vitepress/theme/components/icons/RelatedIcons.vue'
import CodeGroup from '../.vitepress/theme/components/base/CodeGroup.vue'
import Badge from '../.vitepress/theme/components/base/Badge.vue'
import Label from '../.vitepress/theme/components/base/Label.vue'
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
  <div :class="$style.iconPreviews">
    <IconPreview
      id="previewer"
      :name="$params.name"
      :iconNode="$params.iconNode"
      :class="$style.preview"
    />
    <IconPreviewSmall
      :name="$params.name"
      :iconNode="$params.iconNode"
       :class="$style.smallPreview"
    />
  </div>
  <div >
    <div :class="$style.info">
      <IconInfo :icon="$params" />
      <div :class="$style.meta">
        <div
          v-if="$params.createdRelease?.version"
          :class="$style.version"
        >
          <Label>Created:</Label>
          <Badge
            :href="`https://github.com/lucide-icons/lucide/releases/tag/v${$params.createdRelease.version}`"
            target="_blank"
            rel="noreferrer noopener"
          >
            v{{$params.createdRelease.version}}
          </Badge>
        </div>
        <div
          v-if="$params.changedRelease?.version"
          :class="$style.version"
        >
          <Label>Last changed:</Label>
          <Badge
            :href="`https://github.com/lucide-icons/lucide/releases/tag/v${$params.changedRelease.version}`"
            target="_blank"
            rel="noreferrer noopener"
          >
            v{{$params.changedRelease.version}}
          </Badge>
        </div>
        <IconContributors :icon="$params" :class="$style.contributors"/>
      </div>
    </div>
    <CodeGroup
      :groups="tabs"
      groupName="icon-code-example"
      :class="$style.code"
    >
      <div
        class="blocks"
        v-html="codeExample"
      />
    </CodeGroup>
  </div>
</div>

<RelatedIcons :icons="$params.relatedIcons" />

<style module>
  .preview {
    grid-area: preview;
    margin-bottom: 24px;
    max-width: 240px;
    width: 240px;
    flex-shrink: 0;
  }

  .layout {
    align-items: flex-start;
  }

  .meta {
    margin-left: auto;
    margin-top: 24px;
  }

  .version, .contributors {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: flex-start;
    margin-bottom: 0px;
    justify-content: flex-start;
  }

  .version:first-child {
    margin-bottom: 8px;
  }

  .iconPreviews {
    display: flex;
    justify-content: flex-start;
    gap: 24px;
  }

  .smallPreview {
    flex-shrink: 2;
    flex-direction: column;
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

    .iconPreviews {
      flex-direction: column;
    }

    .smallPreview {
      flex-direction: row;
      align-items: center;
    }
  }

  @media (min-width: 860px) {
    .info {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .meta {
      border-left: 1px solid var(--vp-c-divider);
      padding-left: 16px;
      margin-top: 0;
    }

    .version, .contributors {
      flex-direction: column;
    }
  }

  @media (min-width: 960px) {
    .info {
      display: block;
      justify-content: space-between;
      align-items: flex-start;
    }

    .meta {
      border-left: none;
      padding-left: 0;
      margin-top: 24px;
    }

    .version, .contributors {
      flex-direction: row;
    }
  }

  @media (min-width: 1152px) {
    .info {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .meta {
      border-left: 1px solid var(--vp-c-divider);
      padding-left: 16px;
      margin-top: 0;
    }

    .version, .contributors {
      flex-direction: row;
      margin-bottom: 8px;
    }
  }
</style>
