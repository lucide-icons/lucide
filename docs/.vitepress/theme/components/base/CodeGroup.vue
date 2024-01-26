<script setup lang="ts">
import { computed, onMounted } from 'vue'
const props = defineProps<{
  groups: string[] | undefined,
  groupName: string,
}>()

const getSaveIdname = (name: string) => {
  return name.toLowerCase().replace(/\s/g, '-')
}

const tabs = computed(() => props.groups?.map((group) => {
  return {
    id: getSaveIdname(group),
    name: group,
  }
}))

const saveTabId = (id: string) => {
  localStorage.setItem(props.groupName, id)
}

onMounted(() => {
  const id = localStorage.getItem(props.groupName)
  if (id) {
    const tab = document.getElementById(`label-tab-${id}`)

    if (tab) {
      tab.click()
    }
  }
})
</script>

<template>
  <div class="vp-code-group">
    <div class="tabs">
      <template v-for="(tab, index) in tabs">
        <input
          type="radio"
          :id="`tab-${tab.id}`"
          :name="`group-${groupName}`"
          :checked="index === 0"
          @change="saveTabId(tab.id)"
        >
        <label :for="`tab-${tab.id}`" :id="`label-tab-${tab.id}`">{{ tab.name }}</label>
      </template>
    </div>
    <slot />
  </div>
</template>
