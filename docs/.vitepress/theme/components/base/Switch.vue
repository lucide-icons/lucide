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
}

/* The thumb sits 2px inside the track and slides with a small bounce. Like the RangeSlider
   thumb, it grows with a soft brand ring on hover and focus, and a little more while pressed */
.thumb {
  display: inline-block;
  margin: 2px;
  background-color: #fff;
  transition:
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.2s ease;
  transition-duration: 0.4s, 0.2s !important;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  /* background-color: var(--vp-c-neutral); */
  box-shadow: var(--vp-shadow-1);
}

.switch:hover .thumb,
.switch:focus-visible .thumb {
  transform: scale(1.1);
  box-shadow: var(--vp-shadow-1), 0 0 0 5px color-mix(in srgb, var(--vp-c-brand) 25%, transparent);
}

.switch:active .thumb {
  transform: scale(1.2);
  box-shadow: var(--vp-shadow-1), 0 0 0 7px color-mix(in srgb, var(--vp-c-brand) 25%, transparent);
}

.switch.enabled .thumb {
  transform: translateX(18px);
}

.switch.enabled:hover .thumb,
.switch.enabled:focus-visible .thumb {
  transform: translateX(18px) scale(1.1);
}

.switch.enabled:active .thumb {
  transform: translateX(18px) scale(1.2);
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
