---
title: Icons
description: Browse all Lucide icons.
layout: page
outline: 2
outlineTitle: Categories
sidebar: true
---
<script setup>
import { useData } from 'vitepress'
import { data } from './icons.data.ts'
import IconsOverview from '~/.vitepress/theme/components/icons/IconsOverview.vue'
import PageContainer from '~/.vitepress/theme/components/PageContainer.vue'
import useIconsWithExternalLibs from '~/.vitepress/theme/composables/useIconsWithExternalLibs'

const { params } = useData()
const icons = useIconsWithExternalLibs(data.icons)
</script>

<div class="VPDoc content">
  <PageContainer>
    <IconsOverview :icons="icons" :activeIcon="params?.name" />
  </PageContainer>
</div>
