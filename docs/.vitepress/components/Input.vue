<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  type: string
  modelValue: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text'
})

const input = ref()

defineEmits(['change', 'input'])

defineExpose({
  focus: () => {
    input.value.focus()
  }
})
</script>

<template>
  <div class="input-wrapper">
    <input
      :type="type"
      class="input"
      ref="input"
      :value="modelValue"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
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

</style>
