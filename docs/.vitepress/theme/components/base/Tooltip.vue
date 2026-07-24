<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useFloating, offset, shift} from '@floating-ui/vue';

const reference = ref(null);
const tooltip = ref(null);
const middleware = ref([shift(), offset(8)]);
const { floatingStyles, update } = useFloating(reference, tooltip, {
  middleware,
  transform: false
});

defineProps<{
  title: string
}>()

onMounted(() => {
  update()
});
</script>

<template>
  <span ref="reference" class="reference">
    <slot/>
  </span>
  <div ref="tooltip" class="tooltip" :style="floatingStyles">
    {{title}}
  </div>
</template>

<style scoped>
.reference:hover + .tooltip{
  opacity: 1;
  transform: scale(1);
}

.tooltip {
  display: block;
  font-size: 12px;
  line-height: 20px;
  transform: scale(0.9);
  font-weight: 400;
  background: var(--vp-c-brand-dark);
  color: white;
  z-index: 99;
  white-space: nowrap;
  padding: 2px 8px;
  border-radius: 4px;
  box-shadow: var(--vp-shadow-1);
  opacity: 0;
  pointer-events: none;
  transition: cubic-bezier(0.19, 1, 0.22, 1) .2s;
  transition-property: opacity, transform;
}
</style>
