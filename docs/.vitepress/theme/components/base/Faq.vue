<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import FaqItem from './FaqItem.vue';

interface FaqEntry {
  question: string;
  answer: string;
}

const props = withDefaults(
  defineProps<{
    title?: string;
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Defaults to the page's `faq` frontmatter, which also feeds the FAQPage structured data. */
    items?: FaqEntry[];
  }>(),
  {
    headingLevel: 2,
  },
);

const { frontmatter } = useData();

const entries = computed<FaqEntry[]>(() => props.items ?? frontmatter.value.faq ?? []);
const headingElement = computed(() => `h${props.headingLevel}`);
</script>

<template>
  <section class="faq">
    <component
      v-if="title"
      :is="headingElement"
      class="title"
    >
      {{ title }}
    </component>
    <div class="items">
      <FaqItem
        v-for="entry in entries"
        :key="entry.question"
        :question="entry.question"
        :answer="entry.answer"
      />
      <slot />
    </div>
  </section>
</template>

<style scoped>
.faq {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.title {
  margin: 0;
  font-size: 32px;
  line-height: 40px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.items {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--vp-c-divider);
}
</style>
