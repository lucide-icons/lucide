<script setup lang="ts">
import { IconEntity } from '../../types';
import IconDetailName from './IconDetailName.vue';
import Badge from '../base/Badge.vue';
import CopySVGButton from './CopySVGButton.vue';
import CopyCodeButton from './CopyCodeButton.vue';
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import {useData, useRouter} from 'vitepress';

defineProps<{
  icon: IconEntity
}>()

const { go } = useRouter()
const { page } = useData()
</script>

<template>
  <div class="icon-info">
    <IconDetailName class="icon-name">
      {{ icon.name }}
    </IconDetailName>
    <div class="group">
      <Badge
        v-for="category in icon.categories"
        class="category"
        :href="`/icons/categories#${category}`"
      >
        {{ category }}
      </Badge>
    </div>

    <div class="group">
      <VPButton
        v-if="!page?.relativePath?.startsWith?.(`icons/${icon.name}`)"
        :href="`/icons/${icon.name}`"
        text="See in action"
        @click="go(`/icons/${icon.name}`)"
      />
      <CopySVGButton />
      <CopyCodeButton :name="icon.name"/>
    </div>

  </div>
</template>

<style scoped>
.group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.category {
  text-transform: capitalize;
}
</style>
