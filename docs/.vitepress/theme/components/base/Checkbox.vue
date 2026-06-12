<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string
  id: string
  value: string
  modelValue: string | string[]
}>()

const emit = defineEmits(['change', 'input', 'update:modelValue'])

const model = computed({
  get: () => {
    if (Array.isArray(props.modelValue)) {
      return props.modelValue.includes(props.value)
    }
    return props.modelValue === props.value

  },
  set: (value: string) => {
    if (Array.isArray(props.modelValue)) {
      const newValue = [...props.modelValue]
      const index = newValue.indexOf(props.value)
      if (value) {
        if (index === -1) {
          newValue.push(props.value)
        }
      } else {
        if (index !== -1) {
          newValue.splice(index, 1)
        }
      }
      emit('update:modelValue', newValue)
    } else {
      emit('update:modelValue', value)
    }
  }
})
</script>

<template>
  <div class="checkbox-wrapper">
    <input
      type="checkbox"
      class="checkbox"
      ref="input"
      :id="id"
      v-model="model"
      v-bind="$attrs"
    />
    <label :for="id" class="checkbox-label">
      {{ label }}
    </label>
  </div>
</template>

<style scoped>
.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox-label {
  line-height: 20px;
  font-size: 13px;
  color: var(--vt-c-text-1);
  transition: color .5s;
  display: block;
}

.checkbox {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  cursor: pointer;
  border: 1px solid var(--vp-input-border-color);
  background-color: var(--vp-input-switch-bg-color);
  border-radius: 4px;
}

.checkbox:checked {
  border-color: transparent;
    background: url("data:image/svg+xml,%3Csvg width='12px' height='12px' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='4' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E")
      center no-repeat var(--vp-c-brand);;
}

</style>
