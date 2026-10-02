<script setup lang="ts">
import { usePersistedIconStyle } from '../../composables/useIconStyle';
import HomeContainer from './HomeContainer.vue';
import RangeSlider from '../base/RangeSlider.vue';
import InputField from '../base/InputField.vue';
import ColorPicker from '../base/ColorPicker.vue';
import ResetButton from '../base/ResetButton.vue';
import HomeIconCustomizerIcons from './HomeIconCustomizerIcons.vue';
import Switch from '../base/Switch.vue';

const { color, strokeWidth, size, absoluteStrokeWidth, resetStyle } = usePersistedIconStyle();
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
              <ColorPicker
                v-model="color"
                id="icon-color-picker"
              />
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
              id="stroke-width-slider"
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
              <span class="customize-label">{{ size }}px</span>
            </template>
            <RangeSlider
              id="size-slider"
              name="size"
              v-model="size"
              :min="16"
              :max="256"
              :step="4"
            />
          </InputField>

          <InputField
            id="absolute-stroke-width"
            label="Absolute Stroke width"
          >
            <template #display>
              <Switch
                id="absolute-stroke-width-switch"
                name="absolute-stroke-width"
                v-model="absoluteStrokeWidth"
              />
            </template>
          </InputField>
        </div>
      </div>

      <div class="icons-container card-column">
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
