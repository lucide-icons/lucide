<script lang="ts">
export default {
  inheritAttrs: false,
}

export interface InputProps {
  type: string
  modelValue: string
}
</script>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text'
})

const input = ref()

defineEmits(['change', 'input', 'update:modelValue'])

defineExpose({
  focus: () => {
    input.value.focus()
  }
})
</script>

<template>
  <div class="input-wrapper">
    <slot name="icon" class="icon" />
    <input
      :type="type"
      class="input"
      :class="{'has-icon': $slots.icon}"
      ref="input"
      :value="modelValue"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style scoped>
.input-wrapper {
  position: relative;
}
.input {
  justify-content: flex-start;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0 10px 0 12px;
  width: 100%;
  height: 40px;
  background-color: var(--vp-c-bg-alt);
  font-size: 14px;
}

.input:hover, .input:focus {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
}

.input.has-icon {
  padding-left: 52px;
}


</style>

<style>
.input-wrapper svg {
  position: absolute;
  left: 16px;
  top: 12px;
  z-index: 1;
  color: var(--vp-c-text-2);
  pointer-events: none;
}
</style>
