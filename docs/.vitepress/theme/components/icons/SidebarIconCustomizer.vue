<script setup lang="ts">
import { useIconStyleContext } from '../../composables/useIconStyle';
import RangeSlider from '../base/RangeSlider.vue';
import InputField from '../base/InputField.vue';
import ColorPicker from '../base/ColorPicker.vue';
import ResetButton from '../base/ResetButton.vue';
import Switch from '../base/Switch.vue';

const { color, strokeWidth, size, absoluteStrokeWidth, isCustomized, resetStyle } =
  useIconStyleContext();
</script>

<template>
  <div
    class="customizer-card"
    :class="{ customized: isCustomized }"
  >
    <div class="card-header">
      <h2 class="card-title">Customizer</h2>
      <ResetButton @click="resetStyle"></ResetButton>
    </div>
    <InputField
      id="icon-color"
      label="Color"
    >
      <ColorPicker
        v-model="color"
        id="icon-color"
        class="color-picker"
      />
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
        :max="256"
        :step="4"
      />
    </InputField>

    <InputField
      id="absolute-stroke-width"
      label="Absolute stroke width"
    >
      <Switch
        id="absolute-stroke-width"
        name="absolute-stroke-width"
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
  border: 1px solid transparent;
  transition: border-color 0.4s ease-in-out;
}

.customizer-card.customized {
  border-color: var(--vp-c-brand);
}

.color-picker {
  width: 100%;
}
</style>
