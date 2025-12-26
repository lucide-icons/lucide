---
title: Icons
layout: page
outline: 2
outlineTitle: Categories
sidebar: true
head:
  - - link
    - rel: canonical
      content: https://lucide.dev/icons/
---

<script setup>
import { computed } from 'vue'
import { data } from './icons.data.ts'
import IconsOverview from '~/.vitepress/theme/components/icons/IconsOverview.vue'
import PageContainer from '~/.vitepress/theme/components/PageContainer.vue'
import useIconsWithExternalLibs from '~/.vitepress/theme/composables/useIconsWithExternalLibs'

const icons = useIconsWithExternalLibs(data.icons)
</script>

<div class="VPDoc content">
  <PageContainer>
    <IconsOverview :icons="icons" />
  </PageContainer>
</div>
