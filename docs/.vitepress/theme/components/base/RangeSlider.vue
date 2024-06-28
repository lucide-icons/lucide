<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  modelValue: number | string;
  min?: number;
  max?: number;
  step?: number;
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 48,
})

defineEmits(['update:modelValue'])

const percentage = computed<string>(() => `${((Number(props.modelValue) - props.min) / (props.max - props.min)) * 100}%`);
// TODO: Steps must be implemented
</script>


<template>
  <div class="slider">
    <input
      :id="id"
      type="range"
      v-bind="$attrs"
      v-bind:value="modelValue"
      v-on:input="$emit('update:modelValue', Number($event.target.value))"
      :min="min"
      :max="max"
      :step="step"
    />
    <div class="bar"></div>
  </div>
</template>

<style>
.slider {
    position: relative;
    width: 100%;
    line-height: 10px;
    height: 20px;
    --bar-color: var(--slider-bar-color, var(--vp-input-switch-bg-color));
}

.slider:hover input{
    opacity: 1;
}
.slider .bar {
    position: absolute;
    top: 8px;
    left: 0;
    width: 100%;
    height: 100%;
}
.slider .bar:before, .slider .bar:after {
    content: "";
    position: absolute;
    height: 4px;
    pointer-events: none;
}
.slider .bar:before {
    width: v-bind(percentage);
    z-index: 1;
    left: 0;
    background: var(--vp-c-brand);
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}
.slider .bar:after {
    background: var(--bar-color);
    width: calc(100% - v-bind(percentage));
    right: 0;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
.slider input {
  -webkit-appearance: none;
  width: calc(100% + 20px);
  height: 20px;
  left: -10px;
  position: relative;
  z-index: 2;
  background: transparent;
  outline: none;
  /* opacity: 0.7; */
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  margin: 0;
  cursor: pointer;

  /* @apply
    md:opacity-0 */
}

.slider input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #FFFFFF;
    border-radius: 10px;
    box-shadow: var(--vp-shadow-2);
    cursor: pointer;
}

.slider input::-moz-range-thumb {
    width: 20px;
    height: 20px;
    appearance: none;
    background: #FFFFFF;
    border-radius: 10px;
    outline: none;
    border: none;
    box-shadow: var(--vp-shadow-2);
    cursor: pointer;
}
</style>
