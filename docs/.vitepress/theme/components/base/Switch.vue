<script setup>
  import { Switch } from '@headlessui/vue'

  defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <Switch
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    class="switch"
    :class="{ enabled: modelValue }"
  >
    <span class="thumb" />
  </Switch>
</template>

<style>
.switch {
  display: inline-flex;
  position: relative;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid var(--vp-input-border-color);
  background-color: var(--vp-input-switch-bg-color);
  transition: border-color 0.25s, background-color 0.4s ease;
  border-radius: 11px;
}

.switch.enabled {
  background-color: var(--vp-c-brand);
}
</style>

<style scoped>
.switch:hover {
  border-color: var(--vp-input-hover-border-color);
}

.thumb {
  display: inline-block;
  background-color: #fff;
  transition: transform 0.25s;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  /* background-color: var(--vp-c-neutral); */
  box-shadow: var(--vp-shadow-1);
}

.switch.enabled .thumb {
  transform: translateX(18px);
}

/* ------------------- */
.VPSwitch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid var(--vp-input-border-color);
  background-color: var(--vp-input-switch-bg-color);
  transition: border-color 0.25s;
}

.VPSwitch:hover {
  border-color: var(--vp-input-hover-border-color);
}

.dark .icon :deep(svg) {
  fill: var(--vp-c-text-1);
  transition: opacity 0.25s;
}
</style>
