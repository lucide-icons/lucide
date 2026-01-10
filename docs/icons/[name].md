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

<div :class="$style.layout">
  <div :class="$style.iconPreviews">
    <IconPreview
      id="previewer"
      :name="params.name"
      :iconNode="params.iconNode"
      :class="$style.preview"
    />
    <IconPreviewSmall
      :name="params.name"
      :iconNode="params.iconNode"
       :class="$style.smallPreview"
    />
  </div>
  <div >
    <div :class="$style.info">
      <IconInfo :icon="params" />
      <div :class="$style.meta">
        <div
          v-if="params.createdRelease?.version"
          :class="$style.version"
        >
          <Label>Created:</Label>
          <Badge
            :href="releaseTagLink(params.createdRelease.version)"
          >
            v{{params.createdRelease.version}}
          </Badge>
        </div>
        <div
          v-if="params.changedRelease?.version"
          :class="$style.version"
        >
          <Label>Last changed:</Label>
          <Badge
            :href="releaseTagLink(params.changedRelease.version)"
          >
            v{{params.changedRelease.version}}
          </Badge>
        </div>
        <IconContributors :icon="params" :class="$style.contributors"/>
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

<IconShowcase
  :name="params.name"
  :iconNode="params.iconNode"
/>

<RelatedIcons
  v-if="params.relatedIcons"
  :icons="params.relatedIcons"
/>

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

  .info {
    --tags-gradient-background: var(--vp-c-bg);
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

<style>
section h2.title {
  text-align: center;
  font-weight: 500;
  margin-block-end: 64px;
  padding-top: 32px;
}
</style>
