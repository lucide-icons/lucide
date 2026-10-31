<script setup lang="ts">
import { chevronDown } from '../../../data/iconNodes';
import Icon from '@lucide/vue/src/Icon';

defineProps<{
  question: string;
  answer?: string;
}>();
</script>

<template>
  <details class="faq-item">
    <summary class="question">
      {{ question }}
      <Icon
        :iconNode="chevronDown"
        name="chevron-down"
        :size="20"
        class="chevron"
        aria-hidden="true"
      />
    </summary>
    <div class="answer">
      <slot>
        <p>{{ answer }}</p>
      </slot>
    </div>
  </details>
</template>

<style scoped>
.faq-item {
  border-bottom: 1px solid var(--vp-c-divider);
}

.question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 56px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  list-style: none;
  cursor: pointer;
}

.question::-webkit-details-marker {
  display: none;
}

.chevron {
  flex-shrink: 0;
  color: var(--vp-c-text-2);
  transition: transform 0.2s;
}

.faq-item[open] .chevron {
  transform: rotate(180deg);
}

.answer {
  padding-bottom: 20px;
  font-size: 16px;
  line-height: 28px;
  color: var(--vp-c-text-2);
}

.answer :slotted(p),
.answer p {
  margin: 0;
}
</style>
