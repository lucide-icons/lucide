<script setup lang="ts">
import { IconEntity } from '../../types';
import IconDetailName from './IconDetailName.vue';
import Badge from '../base/Badge.vue';
import CopySVGButton from './CopySVGButton.vue';
import CopyCodeButton from './CopyCodeButton.vue';
import VPButton from 'vitepress/dist/client/theme-default/components/VPButton.vue';
import {useData, useRouter} from 'vitepress';
import { computed } from 'vue';

const props = defineProps<{
  icon: IconEntity
  popoverPosition?: 'top' | 'bottom'
}>()

const { go } = useRouter()
const { page } = useData()

const tags = computed(() => {
  if (!props.icon) return []
  return props.icon.tags.join(' • ')
})
</script>

<template>
  <div class="icon-info">
    <IconDetailName class="icon-name">
      {{ icon.name }}
    </IconDetailName>
    <p class="icon-tags">
      {{ tags }}
    </p>
    <div class="group">
      <Badge
        v-for="category in icon.categories"
        class="category"
        :href="`/icons/categories#${category}`"
      >
        {{ category }}
      </Badge>
    </div>

    <div class="group buttons">
      <VPButton
        v-if="!page?.relativePath?.startsWith?.(`icons/${icon.name}`)"
        :href="`/icons/${icon.name}`"
        text="See in action"
        @click="go(`/icons/${icon.name}`)"
      />
      <CopySVGButton :name="icon.name" :popoverPosition="popoverPosition"/>
      <CopyCodeButton :name="icon.name" :popoverPosition="popoverPosition"/>
    </div>
    <slot name="footer" />
  </div>
</template>

<style scoped>
.group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}
.category {
  text-transform: capitalize;
}
.icon-name {
  margin-bottom: 4px;
}

.icon-tags {
  font-size: 16px;
  color: var(--vp-c-text-2);
  font-weight: 500;
  margin-top: 0;;
  margin-bottom: 16px;
  line-height: 28px;
}

.buttons {
  margin-top: 24px;
}
</style>
