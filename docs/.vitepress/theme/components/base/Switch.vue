<script setup>
  import { Switch } from '@headlessui/vue'
  import { onMounted, ref } from 'vue'

  defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['update:modelValue'])
  const isHydrated = ref(false)

  onMounted(() => {
    isHydrated.value = true
  })
</script>

<template>
  <Switch
    :model-value="isHydrated ? modelValue : false"
    @update:model-value="emit('update:modelValue', $event)"
    class="switch"
    :class="{ enabled: isHydrated && modelValue }"
    :id="id"
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
  transition-duration: 0.25s, 0.4s !important;
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

.switch:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--vp-c-brand) 25%, transparent);
}

/* The thumb sits 2px inside the track, slides with a small bounce and stretches while pressed */
.thumb {
  display: inline-block;
  margin: 2px;
  background-color: #fff;
  transition:
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    width 0.2s ease;
  transition-duration: 0.4s, 0.2s !important;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  /* background-color: var(--vp-c-neutral); */
  box-shadow: var(--vp-shadow-1);
}

.switch:active .thumb {
  width: 20px;
}

.switch.enabled .thumb {
  transform: translateX(18px);
}

.switch.enabled:active .thumb {
  transform: translateX(14px);
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
