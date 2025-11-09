<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Input from './Input.vue'
import createLucideIcon from 'lucide-vue-next/src/createLucideIcon'
import { search }  from '../../../data/iconNodes'

const SearchIcon = createLucideIcon('search', search)

interface Props {
  modelValue: string
  shortcut?: string
}

const props = defineProps<Props>()

const input = ref()

const emit = defineEmits(['update:modelValue'])

defineExpose({
  focus: () => {
    input.value.focus()
  }
})

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>

<template>
  <Input
    ref="input"
    type="search"
    autofocus
    :shortcut="shortcut"
    v-bind="$attrs"
    v-model="value"
    class="input-wrapper"
  >
    <template #icon>
      <component :is="SearchIcon" class="search-icon" />
    </template>
  </Input>
</template>

<style scoped>
.input {
  justify-content: flex-start;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0 10px 0 12px;
  width: 100%;
  height: 40px;
  background-color: var(--vp-c-bg-alt);
}

.input:hover, .input:focus {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
}

.input-wrapper:deep(.input) {
  /* padding: 12px 24px; */
  padding-block: 12px;
  font-size: 14px;
  height: 48px;
}
</style>
