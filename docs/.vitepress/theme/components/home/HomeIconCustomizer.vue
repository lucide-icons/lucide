<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { syncRef, useCssVar } from '@vueuse/core'
import { usePersistedIconStyle, STYLE_DEFAULTS } from '../../composables/useIconStyle'
import HomeContainer from './HomeContainer.vue'
import RangeSlider from '../base/RangeSlider.vue'
import InputField from '../base/InputField.vue'
import ColorPicker from '../base/ColorPicker.vue'
import ResetButton from '../base/ResetButton.vue'
import HomeIconCustomizerIcons from './HomeIconCustomizerIcons.vue'
import Switch from '../base/Switch.vue'


const iconContainer = ref<HTMLElement | null>()
const absoluteStrokeClass = 'absolute-stroke-width'
const { color, strokeWidth, size, absoluteStrokeWidth } = usePersistedIconStyle()
const homeSize = computed({
  get: () => Math.min(Math.max(size.value, 16), 48),
  set: (value: number) => {
    size.value = value
  },
})

const colorCssVar = useCssVar(
  '--customize-color',
  iconContainer,
  {
    initialValue: 'default'
  }
)

const strokeWidthCssVar = useCssVar(
  '--customize-strokeWidth',
  iconContainer,
  {
    initialValue: '2'
  }
)

const sizeCssVar = useCssVar(
  '--customize-size',
  iconContainer,
  {
    initialValue: '24'
  }
)

syncRef(color, colorCssVar, { direction: 'ltr' })
syncRef(strokeWidth, strokeWidthCssVar, {
  direction: 'ltr',
  transform: { ltr: String },
})
syncRef(homeSize, sizeCssVar, {
  direction: 'ltr',
  transform: { ltr: String },
})

function resetStyle () {
  color.value = STYLE_DEFAULTS.color
  strokeWidth.value = STYLE_DEFAULTS.strokeWidth
  size.value = STYLE_DEFAULTS.size
  absoluteStrokeWidth.value = STYLE_DEFAULTS.absoluteStrokeWidth
}

function syncAbsoluteStrokeWidth(enabled: boolean) {
  iconContainer.value?.classList.toggle('absolute-stroke-width', enabled)
}

watch(absoluteStrokeWidth, syncAbsoluteStrokeWidth)
</script>

<template>
  <HomeContainer>
    <div class="card">
      <div class="card-column">
        <h2 class="title">
          Style as you please
          <ResetButton @click="resetStyle"></ResetButton>
        </h2>
        <p class="copy">
          Lucide has a lot of customization options to match the icons with your UI.
        </p>

        <div
          class="customizer"
          style="--color-picker-bg: var(--vp-input-switch-bg-color)"
        >
          <InputField
            id="icon-color"
            label="Color"
            class="color-picker-field"
          >
            <template #display>
              <ColorPicker v-model="color" id="icon-color"  />
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
              :min="1"
              :max="3"
              :step="0.25"
            />
          </InputField>

          <InputField
            id="size"
            label="Size"
          >
            <template #display>
              <span class="customize-label">{{ homeSize }}px</span>
            </template>
            <RangeSlider
              id="size"
              name="size"
              v-model="homeSize"
              :min="16"
              :max="48"
              :step="4"
            />
          </InputField>

          <InputField
            id="absolute-stroke-width"
            label="Absolute Stroke width"
          >
            <template #display>
              <Switch
                id="absolute-stroke-width"
                name="absolute-stroke-width"
                v-model="absoluteStrokeWidth"
              />
            </template>
          </InputField>
        </div>
      </div>

      <div
        class="icons-container card-column"
        :class="{ [absoluteStrokeClass]: absoluteStrokeWidth }"
        ref="iconContainer"
      >
        <HomeIconCustomizerIcons />
      </div>
    </div>
  </HomeContainer>
</template>

<style scoped>
.card {
  display: block;
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  padding: 24px;
  --slider-bar-color: var(--vp-c-bg-soft-down);
  --color-picker-bg: var(--vp-c-bg-soft-down);
}

.title {
  line-height: 32px;
  font-size: 24px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
}

.copy {
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.customizer {
  margin-top: 32px;
  padding: 0;
  background: none;
}

@media (min-width: 640px) {
  .card {
    display: grid;
    grid-template-columns: 8fr 10fr;
  }
  /*
  .card-column {
    flex: 1;
  } */
}

@media (min-width: 960px) {
  .card {
    grid-template-columns: 1fr 2fr;
  }
}

.color-picker-field:deep(.display-value) {
  width: 138px;
}
</style>
