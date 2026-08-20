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
import IconPreview from '~/.vitepress/theme/components/icons/IconPreview.vue'
import IconPreviewSmall from '~/.vitepress/theme/components/icons/IconPreviewSmall.vue'
import IconInfo from '~/.vitepress/theme/components/icons/IconInfo.vue'
import IconContributors from '~/.vitepress/theme/components/icons/IconContributors.vue'
import IconShowcase from '~/.vitepress/theme/components/icons/IconShowcase.vue'
import RelatedIcons from '~/.vitepress/theme/components/icons/RelatedIcons.vue'
import CodeGroup from '~/.vitepress/theme/components/base/CodeGroup.vue'
import Badge from '~/.vitepress/theme/components/base/Badge.vue'
import Label from '~/.vitepress/theme/components/base/Label.vue'
import PageTabs from '~/.vitepress/theme/components/base/PageTabs.vue'
import { data } from './codeExamples.data'
import { toCamelCase, toPascalCase } from '@lucide/shared'
import { satisfies } from 'semver'

const { params } = useData()

const tabs = computed(() => data.codeExamples?.map(
  (codeExample) => codeExample.title) ?? []
)

const codeExample = computed(() => data.codeExamples?.map(
    (codeExample) => {
      const pascalCaseName = toPascalCase( params.value.name)
      const camelCaseName = toCamelCase(params.value.name)

      return codeExample.code
        .replace(/\$(?:<[^>]+>)*PascalCase/g, pascalCaseName)
        .replace(/\$CamelCase/g, camelCaseName)
        .replace(/\$Name/g, params.value.name)
    }
  ).join('') ?? []
)

function releaseTagLink(version) {
  const shouldAddV = satisfies(version, `<0.266.0`)

  return `https://github.com/lucide-icons/lucide/releases/tag/${shouldAddV ? 'v' : ''}${version}`
}
</script>

<div class="layout">
  <div class="iconPreviews">
    <IconPreview
      id="previewer"
      :name="params.name"
      :iconNode="params.iconNode"
      class="preview"
    />
  </div>

  <div>
    <div class="info">
      <IconInfo :icon="params" />
      <div class="meta">
        <div
          v-if="params.createdRelease?.version"
          class="version"
        >
          <Label>Created:</Label>
          <Badge
            :href="releaseTagLink(params.createdRelease.version)"
          >
            {{params.createdRelease.version}}
          </Badge>
        </div>
        <div
          v-if="params.changedRelease?.version"
          class="version"
        >
          <Label>Last changed:</Label>
          <Badge
            :href="releaseTagLink(params.changedRelease.version)"
          >
            {{params.changedRelease.version}}
          </Badge>
        </div>
        <IconContributors :icon="params" class="contributors"/>
      </div>
    </div>
  </div>
</div>

<PageTabs
  :tabs="['More like this', 'Code examples', 'See in action']"
>
  <template #tab-0>
    <RelatedIcons
      v-if="params.relatedIcons"
      :icons="params.relatedIcons"
    />
  </template>

  <template #tab-1>
    <CodeGroup
      :groups="tabs"
      groupName="icon-code-example"
      class="code"
    >
      <div
        class="blocks"
        v-html="codeExample"
      />
    </CodeGroup>
  </template>

  <template #tab-2>
    <IconShowcase
      :name="params.name"
      :iconNode="params.iconNode"
    />
  </template>
</PageTabs>

<style scoped>
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
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }

  .info {
    --tags-gradient-background: var(--vp-c-bg);
  }

  .version .label {
    margin-top: 12px;
  }

  .badge {
    margin: 12px 0;
  }

  .version, .contributors {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-bottom: 0px;
    justify-content: flex-start;
    gap: 4px;
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
</style>

<style>
  .icon-page-sections h2.title {
    text-align: center;
    font-weight: 500;
    margin-block-end: 64px;
    padding-top: 32px;
  }

  .tab-list {
    margin: 24px -24px 24px;
  }

  @media (min-width: 640px) {
    .tab-list {
      margin: 24px 0 24px;
    }
  }
</style>
