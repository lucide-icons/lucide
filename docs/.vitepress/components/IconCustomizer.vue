<script setup>
import { useCssVar } from '@vueuse/core'

const color = useCssVar(
  '--customize-color',
  document.documentElement,
  {
    initialValue: 'currentColor'
  }
)

const strokeWidth = useCssVar(
  '--customize-strokeWidth',
  document.documentElement,
  {
    initialValue: '2'
  }
)

const size = useCssVar(
  '--customize-size',
  document.documentElement,
  {
    initialValue: '24'
  }
)

</script>

<template>
  <div class="card">
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
    <label for="stroke" class="customize-label">
      Stroke width
    </label>
    <input
      type="number"
      id="stroke"
      name="stroke"
      v-model="strokeWidth"
    />

    <label for="size" class="customize-label">
      Size
    </label>
    <input
      type="number"
      id="size"
      name="size"
      v-model="size"
    />
</div>
</template>

<style scoped>
.customize-label {
  padding-bottom: 8px;
  line-height: 20px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vt-c-text-1);
  transition: color .5s;
  display: block;
}
.card {
  background: var(--vp-c-bg);
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
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
  padding: 8px 12px;
  height: auto;
  font-size: 14px;
  text-align: left;
  border: 1px solid transparent;
  cursor: text;
  display: flex;
  align-items: center;
  gap: 4px;
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
</style>
