<script setup>
import { useCssVar, syncRef } from '@vueuse/core'
import { useIconStyleContext } from '../composables/useIconStyle'
import RangeSlider from './RangeSlider.vue'
import IconButton from './IconButton.vue'
import { rotateCw } from '../../iconNodes'
import createLucideIcon from 'lucide-vue-next/src/createLucideIcon'

const { color, strokeWidth, size } = useIconStyleContext()

const colorCssVar = useCssVar(
  '--customize-color',
  typeof document !== 'undefined' ? document?.documentElement : undefined,
  {
    initialValue: 'default'
  }
)

const strokeWidthCssVar = useCssVar(
  '--customize-strokeWidth',
  typeof document !== 'undefined' ? document?.documentElement : undefined,
  {
    initialValue: '2'
  }
)

const sizeCssVar = useCssVar(
  '--customize-size',
  typeof document !== 'undefined' ? document?.documentElement : undefined,
  {
    initialValue: '24'
  }
)

syncRef(color, colorCssVar)
syncRef(strokeWidth, strokeWidthCssVar)
syncRef(size, sizeCssVar)

const RotateIcon = createLucideIcon('RotateIcon', rotateCw)

function resetStyle () {
  color.value = 'currentColor'
  strokeWidth.value = '2'
  size.value = '24'
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h2 class="card-title">
        Customizer
      </h2>
      <IconButton class="reset-button" @click="resetStyle">
        <RotateIcon size="20"/>
      </IconButton>
    </div>
    <div class="input-field">
      <div class="input-label">
      <label for="icon-color" class="customize-label">
        Color
      </label>
      <div class="color-picker">

        <div class="color-input-wrapper">
          <input
            type="color"
            id="icon-color"
            name="icon-color"
            class="color-input"
            v-model="color"
          />
        </div>
        <input
          type="text"
          id="icon-color-input"
          name="icon-color-input"
          class="color-input-text"
          v-model="color"
        />
      </div>
    </div>
    </div>
    <div class="input-field">
      <div class="input-label">
        <label for="stroke" class="customize-label">
          Stroke width
        </label>
        <div class="display-value">
          <span class="customize-label">{{ strokeWidth }}px</span>
        </div>
      </div>
      <RangeSlider
        id="stroke"
        name="stroke"
        v-model="strokeWidth"
        :min="0"
        :max="8"
      />
    </div>
    <div class="input-field">
      <div class="input-label">
        <label for="size" class="customize-label">
          Size
        </label>
        <div class="display-value">
          <span class="customize-label">{{ size }}px</span>
        </div>
      </div>
      <RangeSlider
        id="size"
        name="size"
        v-model="size"
        :min="16"
        :max="48"
      />
    </div>
</div>
</template>

<style scoped>
.customize-label {
  line-height: 20px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vt-c-text-1);
  transition: color .5s;
  display: block;
}

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
.card {
  background: var(--vp-c-bg);
  padding: 12px 24px 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  position: relative;
  z-index: 0;
}
.color-input {
  width: 34px;
  height: 34px;
  position: absolute;
  top: -5px;
  left: -5px;
}
.color-input-wrapper {
  height: 24px;
  width: 24px;
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  flex-shrink: 0;
}
.color-picker {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  color: var(--vp-c-text-2);
  padding: 4px 8px;
  height: auto;
  font-size: 14px;
  text-align: left;
  border: 1px solid transparent;
  cursor: text;
  display: flex;
  align-items: center;
  gap: 2px;
}

.color-input-text {
  width: 100%;
  height: 100%;
  padding: 0 8px;
  border: none;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 14px;
  text-align: left;
  border-radius: 8px;
  cursor: text;
}

.color-picker:hover, .color-picker:focus {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-alt);
}

.input-field:not(:last-child) {
  margin-bottom: 16px;
}

.display-value {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.input-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 12px;
}

.reset-button {
  background: none;
  padding: 0;
  transition: ease-in-out 0.1s transform;
}

.reset-button:hover {
  background: none;
  border-color: transparent;
}

/* a rotate css animation keyframes */
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}

.reset-button:active {
  transform: rotate(45deg);
}


</style>
