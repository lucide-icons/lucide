<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import type { IconEntity } from '../types'
import IconItem from './IconItem.vue'
import IconDetailOverlay from './IconDetailOverlay.vue'
import IconGrid from './IconGrid.vue'
import Input from './Input.vue'
import useSearch from '../lib/useSearch'

const props = defineProps<{
  icons: IconEntity[]
}>()

const activeIconName = ref('')
const searchQuery = ref(
  typeof window === 'undefined'
    ? ''
    : (
      new URLSearchParams(window.location.search).get('search')
      || ''
    )
)
const searchInput = ref()
const searchResults = useSearch(searchQuery, props.icons, [
  { name: 'name', weight: 2 },
  { name: 'tags', weight: 1 },
])

function setActiveIconName(name: string) {
  activeIconName.value = name
}

const activeIcon = computed(() =>
  props.icons.find((icon) => icon.name === activeIconName.value)
)

watch(searchQuery, (searchString) => {
  const newUrl = new URL(window.location.href);

  newUrl.searchParams.set('search', searchString);

  nextTick(() => {
    window.history.replaceState({}, '', newUrl)
  })
})

onMounted(() => {
  const searchParams = new URLSearchParams(window.location.search);
  if(searchParams.has('search')) {
    searchInput.value.focus()
  }

})
</script>

<template>
  <Input type="search" placeholder="Search icons..." v-model="searchQuery" class="input-wrapper" ref="searchInput"/>
  <IconGrid :activeIcon="activeIconName" :icons="searchResults" @setActiveIcon="setActiveIconName"/>
  <IconDetailOverlay :icon="activeIcon" @close="setActiveIconName('')"/>
</template>

<style>
.icons {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));
  gap: 8px;
  width: 100%;
}

.icon {
  aspect-ratio: 1/1;
}

.input-wrapper .input {
  padding: 12px 24px;
  font-size: 14px;
  height: 48px;
}

.input-wrapper {
  margin-bottom: 8px;
}
</style>
