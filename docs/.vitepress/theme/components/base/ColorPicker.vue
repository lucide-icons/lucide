<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Chrome } from '@ckpack/vue-color'

const props = defineProps<{
  modelValue: string
  id: string
}>()

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const pickerColor = ref(props.modelValue === 'currentColor' ? '#000000' : props.modelValue || '#000000')
const showPicker = ref(false)
const pickerPosition = ref({ top: '0px', left: '0px' })
const colorWrapperRef = ref<HTMLElement | null>(null)
let scrollableParents: Element[] = []

watch(
  () => props.modelValue,
  newVal => {
    pickerColor.value = newVal === 'currentColor' ? '#000000' : newVal || '#000000'
  }
)

function handleColorChange(color: { hex: string }) {
  value.value = color.hex
}

function updatePosition() {
  const rect = colorWrapperRef.value?.getBoundingClientRect()
  if (!rect) return
  
  pickerPosition.value = {
    top: `${rect.bottom + 8}px`,
    left: `${rect.left}px`,
  }
}

function togglePicker(e: MouseEvent) {
  e.stopPropagation()
  if (showPicker.value) {
    showPicker.value = false
    return
  }
  updatePosition()
  showPicker.value = true
}

function handleDocumentClick(e: MouseEvent) {
  if (!showPicker.value) return
  const pickerEl = document.querySelector('.color-picker-popup')
  const swatch = colorWrapperRef.value
  if (
    pickerEl && !pickerEl.contains(e.target as Node) &&
    swatch && !swatch.contains(e.target as Node)
  ) {
    showPicker.value = false
  }
}

function setupScrollListeners() {
  if (!colorWrapperRef.value) return
  
  let element = colorWrapperRef.value
  const newScrollableParents: Element[] = []
  
  while (element.parentElement) {
    element = element.parentElement
    
    const style = window.getComputedStyle(element)
    const overflowY = style.getPropertyValue('overflow-y')
    const overflowX = style.getPropertyValue('overflow-x')
    
    if (
      overflowY === 'auto' || 
      overflowY === 'scroll' ||
      overflowX === 'auto' || 
      overflowX === 'scroll'
    ) {
      newScrollableParents.push(element)
      element.addEventListener('scroll', handleScroll, { passive: true })
    }
  }
  
  return newScrollableParents
}

function removeScrollListeners(scrollableParents: Element[]) {
  scrollableParents.forEach(element => {
    element.removeEventListener('scroll', handleScroll)
  })
}

function handleScroll() {
  if (showPicker.value) {
    showPicker.value = false
  }
}

function attachGlobalListeners() {
  document.addEventListener('click', handleDocumentClick, true)
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', updatePosition, { passive: true })
}

function detachGlobalListeners() {
  document.removeEventListener('click', handleDocumentClick, true)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updatePosition)
  
  if (scrollableParents.length) {
    removeScrollListeners(scrollableParents)
    scrollableParents = []
  }
}

onMounted(attachGlobalListeners)
onBeforeUnmount(detachGlobalListeners)

watch(showPicker, (opened) => {
  if (opened) {
    scrollableParents = setupScrollListeners() || []
  } else {
    if (scrollableParents.length) {
      removeScrollListeners(scrollableParents)
      scrollableParents = []
    }
  }
})
</script>

<template>
  <div class="color-picker">
    <div
      ref="colorWrapperRef"
      class="color-input-wrapper"
      @click="togglePicker"
    >
      <div
        class="color-swatch"
        :style="{ backgroundColor: value === 'currentColor' ? '#000000' : (value || '#000000') }"
      >
      </div>
    </div>

    <input
      type="text"
      :id="`${id}-input`"
      :name="`${id}-input`"
      class="color-input-text"
      aria-label="Color picker input"
      v-model="value"
    />

    <Teleport to="body">
      <div
        v-if="showPicker"
        class="color-picker-popup"
        :style="pickerPosition"
        @click.stop
      >
        <Chrome
          :model-value="pickerColor"
          @update:modelValue="handleColorChange"
          :disable-alpha="true"
        />
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.color-input-wrapper {
  height: 24px; 
  width: 24px;
  overflow: hidden; 
  position: relative;
  border-radius: 12px;
  flex-shrink: 0; 
  cursor: pointer;
}

.color-swatch { 
  width: 100%; 
  height: 100%; 
  border-radius: 12px; 
}

.color-picker {
  background: var(--color-picker-bg, var(--vp-c-bg-alt));
  border-radius: 8px;
  color: var(--vp-c-text-2);
  padding: 4px 8px;
  display: flex; 
  align-items: center; 
  gap: 2px;
  border: 1px solid transparent;
  cursor: text; 
  font-size: 14px;
}

.color-input-text {
  width: 100%; 
  border: none; 
  background: transparent;
  padding-left: 8px; 
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.color-picker:hover,
.color-picker:focus { 
  border-color: var(--vp-c-brand); 
}

.color-picker-popup {
  position: fixed;
  z-index: 9999;
}

.vc-chrome {
  box-shadow: var(--vp-shadow-3);
  border-radius: 12px;
  border: 1px solid var(--vp-c-brand) !important;
  padding: 8px;
}
</style>

<!-- Non-scoped styles for color picker -->
<style>
.vc-chrome-body { 
  padding-bottom: 2px; 
}

.vc-chrome-sliders,
.vc-chrome-fields-wrap { 
  padding-top: 0 !important; 
}

.vc-chrome-field { 
  width: 100% !important; 
}

.vc-chrome-saturation-wrap { 
  border-radius: 0 !important; 
}

.vc-chrome-fields .vc-input__input { 
  box-shadow: none;
  font-size: 13px; 
}

.vc-chrome-toggle-icon-highlight { 
  left: 0; 
}
</style>