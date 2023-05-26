<script setup lang="ts">
import { shallowRef, type Ref, watch } from 'vue'
import { useCssVar, syncRef } from '@vueuse/core'
import { useIconStyleContext } from '../../composables/useIconStyle'
import RangeSlider from '../base/RangeSlider.vue'
import InputField from '../base/InputField.vue'
import ColorPicker from '../base/ColorPicker.vue'
import ResetButton from '../base/ResetButton.vue'
import Switch from '../base/Switch.vue'

const props = defineProps<{
  rootEl?: Ref<HTMLElement>
}>()

const { color, strokeWidth, size, absoluteStrokeWidth } = useIconStyleContext()
const documentRef = shallowRef<HTMLElement | undefined>(typeof document !== 'undefined' ? document?.documentElement : undefined)

const colorCssVar = useCssVar(
  '--customize-color',
  props.rootEl?.value ?? documentRef.value,
  {
    initialValue: 'default'
  }
)

const strokeWidthCssVar = useCssVar(
  '--customize-strokeWidth',
  props.rootEl?.value ?? documentRef.value,
  {
    initialValue: '2'
  }
)

const sizeCssVar = useCssVar(
  '--customize-size',
  props.rootEl?.value ?? documentRef.value,
  {
    initialValue: '24'
  }
)

syncRef(color, colorCssVar, { direction: 'ltr' })
syncRef(strokeWidth, strokeWidthCssVar, { direction: 'ltr' })
syncRef(size, sizeCssVar, { direction: 'ltr' })

function resetStyle () {
  color.value = 'currentColor'
  strokeWidth.value = 2
  size.value = 24
}

watch(absoluteStrokeWidth, (enabled) => {
  const htmlEl = document.documentElement

  htmlEl.classList.toggle('absolute-stroke-width', enabled)
})
</script>

<template>
  <div class="customizer-card">
    <div class="card-header">
      <h2 class="card-title">
        Customizer
      </h2>
      <ResetButton @click="resetStyle"></ResetButton>
    </div>
    <InputField
      id="icon-color"
      label="Color"
    >
      <template #display>
        <ColorPicker v-model="color" id="icon-color" class="color-picker"/>
      </template>
    </InputField>

    <InputField
      id="stroke-width"
      label="Stroke width"
    >
      <template #display>
        <span class="customize-label">{{ strokeWidth }}px</span>
      </template>
      <RangeSlider
        id="stroke-width"
        name="stroke-width"
        v-model="strokeWidth"
        :min="0.5"
        :max="3"
        :step="0.25"
      />
    </InputField>

    <InputField
      id="size"
      label="Size"
    >
      <template #display>
        <span class="customize-label">{{ size }}px</span>
      </template>
      <RangeSlider
        id="size"
        name="size"
        v-model="size"
        :min="16"
        :max="48"
        :step="4"
      />
    </InputField>

    <InputField
      id="absolute-stroke-width"
      label="Absolute Stroke width"
    >
      <Switch
        id="size"
        name="size"
        v-model="absoluteStrokeWidth"
      />
    </InputField>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.card-title {
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 32px;
  font-size: 16px;
  /* margin-bottom: 12px; */
}
.customizer-card {
  background: var(--vp-c-bg);
  padding: 12px 24px 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  position: relative;
  z-index: 0;
}

.color-picker {
  margin-left: auto;
}

#absolute-stroke-width {
  flex-direction: row-reverse;
}

</style>
