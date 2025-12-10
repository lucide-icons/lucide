<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Input from './Input.vue';
import createLucideIcon from 'lucide-vue-next/src/createLucideIcon';
import { search, x } from '../../../data/iconNodes';

const SearchIcon = createLucideIcon('search', search);
const XIcon = createLucideIcon('close', x);

interface Props {
  modelValue: string;
  shortcut?: string;
}

const props = defineProps<Props>();

const input = ref();

const emit = defineEmits(['update:modelValue']);

defineExpose({
  focus: () => {
    input.value.focus();
  },
});

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const clear = () => {
  value.value = '';
};
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
    <template #startIcon>
      <component
        :is="SearchIcon"
        class="search-icon"
      />
    </template>

    <template #endIcon>
      <button
        class="clear-button"
        type="button"
        v-if="value"
      >
        <component
          :is="XIcon"
          class="x-icon"
          @click="clear"
        />
      </button>
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
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
  transition: border-color 0.15s ease-in-out;
}

.input:hover,
.input:focus {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
}

.input-wrapper:deep(.input) {
  padding-block: 12px;
  font-size: 14px;
  height: 48px;
}

.clear-button {
  position: absolute;
  padding: 4px;
  right: 8px;
  top: 8px;
  width: 32px;
  height: 32px;
  background: transparent;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.clear-button:hover {
  background: var(--vp-button-alt-bg);
}

.input-wrapper:deep(.input)::-webkit-search-decoration,
.input-wrapper:deep(.input)::-webkit-search-cancel-button,
.input-wrapper:deep(.input)::-webkit-search-results-button,
.input-wrapper:deep(.input)::-webkit-search-results-decoration {
  display: none;
}
</style>
